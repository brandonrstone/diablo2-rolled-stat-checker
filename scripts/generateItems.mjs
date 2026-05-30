// @ts-nocheck
/*
 * Regenerates src/data/{UniqueItems,SetItems,Runewords}.ts from authoritative
 * Diablo II: Resurrected game tables.
 *
 * Primary source: blizzhackers/d2data (D2R 3.0 JSON, cached under scripts/.cache/bh).
 * Skill name resolution: d2api skills.json + skilldesc.json (cached under scripts/.cache).
 * Localized stat strings: blizzhackers allstrings-eng.json.
 *
 * The existing data files are used as the "spine": we keep each item's id and
 * display name (so the public/item-icons/* image slugs and search keep working)
 * and only regenerate its stats + base-item stats from the source tables, matching
 * by display name (with an alias table + fuzzy fallback for typo'd names).
 *
 * Run:  node scripts/generateItems.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CACHE = path.join(__dirname, '.cache');
const BH = path.join(CACHE, 'bh');

const load = (dir, name) => JSON.parse(fs.readFileSync(path.join(dir, name + '.json'), 'utf8'));
const asArray = (o) => (Array.isArray(o) ? o : Object.values(o));

// ---------------------------------------------------------------------------
// Source tables
// ---------------------------------------------------------------------------
const STR = load(CACHE, 'allstrings-eng'); // { key: "value" }
const PROPS = load(BH, 'properties'); // keyed by code
const ISC = load(BH, 'itemstatcost'); // keyed by stat name
const UNIQ = asArray(load(BH, 'uniqueitems'));
const SET = asArray(load(BH, 'setitems'));
const RUNES = load(BH, 'runes'); // keyed by runeword display name
const ARMOR = asArray(load(BH, 'armor'));
const WEAPONS = asArray(load(BH, 'weapons'));
const SKILLS = asArray(load(CACHE, 'skills'));
const SKILLDESC = asArray(load(CACHE, 'skilldesc'));

const propByCode = (code) => PROPS[code];
const iscByStat = (stat) => ISC[stat];
const S = (key) => (key != null && STR[key] != null ? STR[key] : null);

// Base item lookups (by item code)
const baseArmor = {};
for (const a of ARMOR) if (a && a.code) baseArmor[a.code] = a;
const baseWeapon = {};
for (const w of WEAPONS) if (w && w.code) baseWeapon[w.code] = w;

// ---------------------------------------------------------------------------
// Skill name resolution
// ---------------------------------------------------------------------------
const skillById = {};
const skillByInternal = {};
for (const s of SKILLS) {
  const id = s.Id ?? s['*Id'] ?? s.id;
  if (id != null && id !== '') skillById[String(id)] = s;
  if (s.skill) skillByInternal[String(s.skill).toLowerCase()] = s;
}
const skilldescByName = {};
for (const d of SKILLDESC) if (d.skilldesc) skilldescByName[d.skilldesc] = d;

function skillName(par) {
  if (par == null || par === '') return null;
  const raw = String(par);
  let row = /^\d+$/.test(raw) ? skillById[raw] : skillByInternal[raw.toLowerCase()];
  if (!row) {
    // Some sources pass the already-display name directly.
    return /^\d+$/.test(raw) ? null : raw;
  }
  const desc = skilldescByName[row.skilldesc];
  const display = desc && S(desc['str name']);
  return display || row.skill || raw;
}

const CLASS_NAMES = {
  ama: 'Amazon', sor: 'Sorceress', nec: 'Necromancer', pal: 'Paladin',
  bar: 'Barbarian', dru: 'Druid', ass: 'Assassin',
};

// Standard D2 skill-tab ids (0..20) -> display label
const SKILL_TABS = {
  0: 'Bow and Crossbow Skills', 1: 'Passive and Magic Skills', 2: 'Javelin and Spear Skills',
  3: 'Fire Skills', 4: 'Lightning Skills', 5: 'Cold Skills',
  6: 'Curses', 7: 'Poison and Bone Skills', 8: 'Summoning Skills',
  9: 'Combat Skills', 10: 'Offensive Auras', 11: 'Defensive Auras',
  12: 'Warcries', 13: 'Combat Skills', 14: 'Combat Masteries',
  15: 'Summoning Skills', 16: 'Shape Shifting Skills', 17: 'Elemental Skills',
  18: 'Traps', 19: 'Shadow Disciplines', 20: 'Martial Arts',
};

const CTC_EVENT = {
  'att-skill': 'on attack',
  'hit-skill': 'on striking',
  'gethit-skill': 'when struck',
  'kill-skill': 'when you Kill an Enemy',
  'death-skill': 'when you Die',
  'levelup-skill': 'when you Level-Up',
};

const ELEM_DMG = {
  'dmg-fire': 'Fire', 'dmg-cold': 'Cold', 'dmg-ltng': 'Lightning',
  'dmg-mag': 'Magic', 'dmg-pois': 'Poison',
};

// ---------------------------------------------------------------------------
// printf template -> "{v}" template
// ---------------------------------------------------------------------------
function printfToTemplate(str) {
  if (str == null) return null;
  let out = str.replace(/%%/g, '\u0001'); // protect literal %
  let signed = false;
  let replaced = false;
  out = out.replace(/%[+ ]?[dilu]/, (m) => {
    replaced = true;
    if (m.includes('+')) signed = true;
    return '{v}';
  });
  // drop any further numeric specifiers (single-value path only)
  out = out.replace(/%[+ ]?[dilu]/g, '');
  out = out.replace(/\u0001/g, '%');
  out = out.replace(/\s+/g, ' ').trim();
  return { template: out, signed, hasValue: replaced };
}

const num = (v) => (v === '' || v == null ? undefined : Number(v));

// ---------------------------------------------------------------------------
// Convert one (propCode, par, min, max) into StatLine[]
// ---------------------------------------------------------------------------
function statLine(template, { signed, min, max, order } = {}) {
  const hasMin = typeof min === 'number' && Number.isFinite(min);
  const hasMax = typeof max === 'number' && Number.isFinite(max);
  let kind = 'fixed';
  if (hasMin && hasMax && min !== max) kind = 'roll';
  const line = { template, kind };
  if (signed) line.signed = true;
  if (hasMin) line.min = min;
  if (hasMax) line.max = max;
  if (typeof order === 'number') line.order = order;
  return line;
}

// order/priority for a property's first resolvable stat
function priorityOfStat(stat) {
  const c = iscByStat(stat);
  const p = c && num(c.descpriority);
  return typeof p === 'number' ? p : 0;
}

function genericFromStat(stat, min, max) {
  const c = iscByStat(stat);
  if (!c) return null;
  const pos = printfToTemplate(S(c.descstrpos));
  if (!pos || !pos.template) return null;
  let template = pos.template;
  const extra = S(c.descstr2);
  if (extra) template = `${template} ${extra}`;
  return statLine(template, { signed: pos.signed, min, max, order: priorityOfStat(stat) });
}

// perlevel value shown at clvl 99 (per-level amount is par/8 in vanilla)
function perLevelValue(par) {
  const p = num(par);
  if (p == null) return undefined;
  return Math.floor((p * 99) / 8);
}

function renderProp(code, par, min, max) {
  if (!code) return [];
  const mn = num(min);
  const mx = num(max);
  const lines = [];

  // ---- Enhanced / flat damage ----
  if (code === 'dmg%') {
    return [statLine('{v}% Enhanced Damage', { signed: true, min: mn, max: mx, order: 219 })];
  }
  if (code === 'dmg-min') return [statLine('{v} to Minimum Damage', { signed: true, min: mn, max: mx, order: 215 })];
  if (code === 'dmg-max') return [statLine('{v} to Maximum Damage', { signed: true, min: mn, max: mx, order: 214 })];
  if (code === 'dmg' || code === 'dmg-norm') {
    return [statLine('Adds {v} Damage', { min: mn, max: mx, order: 213 })];
  }
  if (ELEM_DMG[code]) {
    const elem = ELEM_DMG[code];
    if (code === 'dmg-pois') {
      const secs = num(par) ? Math.round(num(par) / 25) : undefined;
      const suffix = secs ? ` Over ${secs} Seconds` : '';
      return [statLine(`Adds {v} Poison Damage${suffix}`, { min: mn, max: mx, order: 210 })];
    }
    return [statLine(`Adds {v} ${elem} Damage`, { min: mn, max: mx, order: 211 })];
  }
  if (code === 'dmg-elem') {
    return ['Fire', 'Lightning', 'Cold'].map((elem, i) =>
      statLine(`Adds {v} ${elem} Damage`, { min: mn, max: mx, order: 211 - i }),
    );
  }

  // ---- Grouped resist / attributes ----
  if (code === 'res-all') return [statLine('All Resistances {v}', { signed: true, min: mn, max: mx, order: 39 })];
  if (code === 'res-all-max') return [statLine('{v}% to All Maximum Resistances', { signed: true, min: mn, max: mx, order: 40 })];
  if (code === 'all-stats') return [statLine('{v} to All Attributes', { signed: true, min: mn, max: mx, order: 64 })];

  // ---- Class skills (property code is the class) ----
  if (CLASS_NAMES[code]) {
    return [statLine(`{v} to ${CLASS_NAMES[code]} Skill Levels`, { signed: true, min: mn, max: mx, order: 157 })];
  }

  // ---- Skill-tab ----
  if (code === 'skilltab') {
    const tab = SKILL_TABS[num(par)] || 'Skills';
    return [statLine(`{v} to ${tab}`, { signed: true, min: mn, max: mx, order: 156 })];
  }

  // ---- Single / non-class skill grants ----
  if (code === 'skill') {
    const nm = skillName(par);
    if (nm) return [statLine(`{v} to ${nm}`, { signed: true, min: mn, max: mx, order: 96 })];
  }
  if (code === 'oskill') {
    const nm = skillName(par);
    if (nm) return [statLine(`{v} to ${nm}`, { signed: true, min: mn, max: mx, order: 95 })];
  }

  // ---- Aura when equipped ----
  if (code === 'aura') {
    const nm = skillName(par) || 'Unknown';
    const lvl = mn ?? mx ?? 1;
    return [{ template: `Level ${lvl} ${nm} Aura When Equipped`, kind: 'fixed', order: 97 }];
  }

  // ---- Charged skill ----
  if (code === 'charged') {
    const nm = skillName(par) || 'Unknown';
    const lvl = mn ?? 1;
    const charges = mx ?? 0;
    return [{ template: `Level ${lvl} ${nm} (${charges}/${charges} Charges)`, kind: 'fixed', order: 94 }];
  }

  // ---- Chance to cast on event ----
  if (CTC_EVENT[code]) {
    const nm = skillName(par) || 'Unknown';
    const chance = mn ?? 0;
    const lvl = mx ?? 1;
    return [{ template: `${chance}% Chance to cast Level ${lvl} ${nm} ${CTC_EVENT[code]}`, kind: 'fixed', order: 93 }];
  }

  // ---- Sockets / durability / indestructible / ethereal ----
  if (code === 'sock') return [{ template: `Socketed (${mn ?? mx ?? 0})`, kind: 'fixed', order: 1 }];
  if (code === 'indestruct') return [{ template: 'Indestructible', kind: 'fixed', order: 6 }];
  if (code === 'ethereal') return [{ template: 'Ethereal (Cannot be Repaired)', kind: 'fixed', order: 5 }];
  if (code === 'dur') return [statLine('{v} Maximum Durability', { signed: true, min: mn, max: mx, order: 4 })];
  if (code === 'rep-quant') return [{ template: 'Replenishes Quantity', kind: 'fixed', order: 3 }];

  // ---- Per-level scaling ----
  const prop = propByCode(code);
  if (prop) {
    const stat0 = prop.stat1;
    if (stat0 && /perlevel$/.test(stat0)) {
      const c = iscByStat(stat0);
      const pos = printfToTemplate(S(c && c.descstrpos));
      const v = perLevelValue(par != null && par !== '' ? par : mn);
      if (pos && pos.template) {
        let template = pos.template;
        const extra = S(c.descstr2);
        if (extra) template = `${template} ${extra}`;
        return [statLine(template, { signed: pos.signed, min: v, max: v, order: priorityOfStat(stat0) })];
      }
    }

    // ---- Generic: expand each resolvable stat ----
    const stats = [];
    for (let i = 1; i <= 7; i++) if (prop['stat' + i]) stats.push(prop['stat' + i]);
    // skip secondary length stats already folded into elemental damage
    const filtered = stats.filter((s) => !/^(coldlength|poisonlength)$/.test(s));
    for (const stat of filtered) {
      const line = genericFromStat(stat, mn, mx);
      if (line) lines.push(line);
      if (lines.length) break; // one display line per property is the norm
    }
    if (lines.length) return lines;
  }

  return [];
}

// ---------------------------------------------------------------------------
// Base item stats
// ---------------------------------------------------------------------------
function computeBaseStats(code, props) {
  // props: array of { code, par, min, max } already parsed for this item
  const armor = baseArmor[code];
  const weapon = baseWeapon[code];
  const base = {};

  const find = (c) => props.find((p) => p.code === c);
  const acFlat = find('ac');
  const acPct = find('ac%');

  if (armor) {
    const minac = num(armor.minac);
    const maxac = num(armor.maxac);
    if (minac != null && maxac != null && (minac > 0 || maxac > 0)) {
      const edMin = acPct ? num(acPct.min) ?? 0 : 0;
      const edMax = acPct ? num(acPct.max) ?? num(acPct.min) ?? 0 : 0;
      const flatMin = acFlat ? num(acFlat.min) ?? 0 : 0;
      const flatMax = acFlat ? num(acFlat.max) ?? num(acFlat.min) ?? 0 : 0;
      base.defenseMin = Math.round(minac * (1 + edMin / 100)) + flatMin;
      base.defenseMax = Math.round(maxac * (1 + edMax / 100)) + flatMax;
    }
    if (num(armor.durability)) base.durability = num(armor.durability);
    if (num(armor.reqstr)) base.reqStr = num(armor.reqstr);
    if (num(armor.reqdex)) base.reqDex = num(armor.reqdex);
    if (num(armor.block)) base.block = num(armor.block);
  } else if (weapon) {
    if (num(weapon.mindam) != null && num(weapon.maxdam) != null && (num(weapon.mindam) || num(weapon.maxdam))) {
      base.damageMin = num(weapon.mindam);
      base.damageMax = num(weapon.maxdam);
    }
    if (num(weapon['2handmindam'])) {
      base.twoHandDamageMin = num(weapon['2handmindam']);
      base.twoHandDamageMax = num(weapon['2handmaxdam']);
    }
    if (num(weapon.minmisdam)) {
      base.throwDamageMin = num(weapon.minmisdam);
      base.throwDamageMax = num(weapon.maxmisdam);
    }
    if (num(weapon.durability)) base.durability = num(weapon.durability);
    if (num(weapon.reqstr)) base.reqStr = num(weapon.reqstr);
    if (num(weapon.reqdex)) base.reqDex = num(weapon.reqdex);
  }

  return Object.keys(base).length ? base : undefined;
}

// ---------------------------------------------------------------------------
// Build stat list for a source item row (uniques/sets use propN/parN/minN/maxN)
// ---------------------------------------------------------------------------
function parseProps(row, count, prefix = 'prop') {
  const props = [];
  for (let i = 1; i <= count; i++) {
    const code = row[prefix + i];
    if (!code || String(code).startsWith('*')) continue;
    props.push({ code, par: row['par' + i], min: row['min' + i], max: row['max' + i] });
  }
  return props;
}

function buildStats(props) {
  const out = [];
  for (const p of props) {
    // ac / ac% are ALSO added into the base defense header (see computeBaseStats),
    // but the game still lists them as blue mods, so we keep them here too.
    out.push(...renderProp(p.code, p.par, p.min, p.max));
  }
  // stable sort by descending in-game priority
  return out
    .map((s, i) => ({ s, i }))
    .sort((a, b) => (b.s.order ?? 0) - (a.s.order ?? 0) || a.i - b.i)
    .map(({ s }) => s);
}

// ---------------------------------------------------------------------------
// Name matching: app spine -> source rows
// ---------------------------------------------------------------------------
const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/strength/g, 'string') // undo the data set's string->Strength typo
    .replace(/[^a-z0-9]/g, '');

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[m][n];
}

// Explicit renames the heuristics can't safely infer (normalized app -> normalized source).
const ALIASES = {
  wispprojector: 'wisp',
  bartucscutthroat: 'cutthroat1',
  deathsfathom: 'fathom',
  astreonsironward: 'ironward',
};

/**
 * Greedy, base-aware batch matcher.
 *  1. exact display-name match
 *  2. explicit alias
 *  3. exactly one *unclaimed* source row sharing the same base item
 *  4. fuzzy among unclaimed rows of the same base
 *  5. strict global fuzzy among unclaimed rows
 * Source rows are claimed at most once, so genuinely custom items (whose base's
 * vanilla uniques are already claimed) correctly fall through to a legacy render.
 */
function matchAll(appItems, rows, nameOf, baseOf) {
  const byNorm = new Map();
  const byBase = new Map();
  for (const r of rows) {
    const dn = nameOf(r);
    if (dn && !byNorm.has(norm(dn))) byNorm.set(norm(dn), r);
    if (baseOf) {
      const b = norm(baseOf(r));
      if (b) (byBase.get(b) || byBase.set(b, []).get(b)).push(r);
    }
  }
  const claimed = new Set();
  const results = new Array(appItems.length).fill(null);

  const claim = (i, row, how, extra) => {
    claimed.add(row);
    results[i] = { row, how, ...extra };
  };

  // pass 1: exact
  appItems.forEach((app, i) => {
    const row = byNorm.get(norm(app.name));
    if (row && !claimed.has(row)) claim(i, row, 'exact');
  });
  // pass 2: alias
  appItems.forEach((app, i) => {
    if (results[i]) return;
    const a = ALIASES[norm(app.name)];
    const row = a && byNorm.get(a);
    if (row && !claimed.has(row)) claim(i, row, 'alias');
  });
  // pass 3 & 4: same-base
  appItems.forEach((app, i) => {
    if (results[i] || !baseOf || app.itemBase == null) return;
    const cands = (byBase.get(norm(app.itemBase)) || []).filter((r) => !claimed.has(r));
    if (cands.length === 1) return claim(i, cands[0], 'base');
    if (cands.length > 1) {
      let best = null, bd = Infinity;
      const key = norm(app.name);
      for (const r of cands) {
        const d = levenshtein(key, norm(nameOf(r)));
        if (d < bd) { bd = d; best = r; }
      }
      if (best && bd <= Math.max(4, Math.ceil(key.length * 0.5))) claim(i, best, `base-fuzzy(${bd})`);
    }
  });
  // pass 5: strict global fuzzy
  appItems.forEach((app, i) => {
    if (results[i]) return;
    const key = norm(app.name);
    let best = null, bd = Infinity, bk = null;
    for (const [k, r] of byNorm) {
      if (claimed.has(r)) continue;
      const d = levenshtein(key, k);
      if (d < bd) { bd = d; best = r; bk = k; }
    }
    if (best && bd <= Math.min(3, Math.ceil(key.length * 0.25))) claim(i, best, `fuzzy(${bd})`, { to: bk });
  });
  return results;
}

// ---------------------------------------------------------------------------
// Load the existing app data (spine) without a TS toolchain
// ---------------------------------------------------------------------------
function loadAppArray(file) {
  let src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  src = src.replace(/^import[^\n]*\n/gm, '');
  src = src.replace(/export const \w+\s*:[^=]*=/, 'return ');
  const Proxyish = new Proxy({}, { get: (_t, k) => String(k) });
  return new Function('Rune', 'Charm', src)(Proxyish, Proxyish);
}

const appUniques = loadAppArray('src/data/UniqueItems.ts');
const appSets = loadAppArray('src/data/SetItems.ts');
const appRunewords = loadAppArray('src/data/Runewords.ts');

// ---------------------------------------------------------------------------
// Hand-authored stats for non-vanilla items that don't exist in the D2R tables
// (so they render consistently and the generator stays idempotent).
// Each entry: [template, signed, min, max, order]
// ---------------------------------------------------------------------------
const ov = (template, signed, min, max, order) => statLine(template, { signed, min, max, order });
const LEGACY_OVERRIDES = {
  hysteria: [
    ov('{v}% Faster Run/Walk', true, 65, 65, 148),
    ov('{v}% Increased Attack Speed', true, 40, 40, 145),
    ov('{v}% Faster Hit Recovery', true, 20, 20, 141),
    ov('{v} to Dexterity', true, 10, 10, 65),
    ov('{v}% Slower Stamina Drain', true, 50, 50, 30),
    ov('All Resistances {v}', true, 10, 10, 39),
    ov('{v} to Evade', true, 6, 6, 96),
  ],
  mania: [
    { template: '5% Chance to cast Burst of Speed on Striking', kind: 'fixed', order: 93 },
    { template: 'Level 1 Fanaticism Aura When Equipped', kind: 'fixed', order: 97 },
    ov('{v}% Increased Attack Speed', true, 30, 30, 145),
    ov('{v}% Enhanced Damage', true, 180, 200, 219),
    ov('{v}% Damage to Undead', true, 75, 75, 110),
    ov('{v} to Attack Rating against Undead', true, 50, 50, 108),
    ov('{v} to Dexterity', true, 10, 10, 65),
  ],
  hellwardenswill: [
    ov('{v} to All Skills', true, 1, 1, 156),
    ov('{v}% Increased Attack Speed', true, 20, 20, 145),
    ov('{v}% Faster Cast Rate', true, 20, 20, 142),
    ov('-{v}% to Enemy Magic Resistance', false, 5, 8, 88),
    ov('-{v}% to Enemy Fire Resistance', false, 5, 8, 88),
    ov('{v}% Enhanced Defense', true, 150, 215, 74),
    ov('{v} to Mana after each Kill', true, 4, 6, 16),
  ],
};

// ---------------------------------------------------------------------------
// Fallback: convert an unmatched app item's legacy stats to StatLine[]
// ---------------------------------------------------------------------------
function legacyFallback(appItem, count) {
  const override = LEGACY_OVERRIDES[norm(appItem.name)];
  if (override) return override.map((s) => ({ ...s }));
  const out = [];
  for (let i = 1; i <= count; i++) {
    const text = appItem['stat' + i];
    if (!text) continue;
    const min = num(appItem['min' + i]);
    const max = num(appItem['max' + i]);
    out.push(statLine(`${text} {v}`, { min, max }));
  }
  return out;
}

// ---------------------------------------------------------------------------
// Generate uniques
// ---------------------------------------------------------------------------
const uniqDisplay = (r) => r.index; // blizzhackers index is already the display name
// Exclude crafted/precrafted variants so they can't be claimed as a base match.
const UNIQ_REAL = UNIQ.filter((r) => r.index && !/^(pre)?crafted /i.test(r.index));
const uniqMatches = matchAll(appUniques, UNIQ_REAL, uniqDisplay, (r) => r['*ItemName']);

const report = { unique: [], set: [], runeword: [] };

const outUniques = appUniques.map((app, idx) => {
  const m = uniqMatches[idx];
  const row = m && m.row;
  const item = { id: app.id, name: app.name };
  if (app.itemBase) item.itemBase = app.itemBase;
  if (app.base) item.base = app.base;
  if (row) {
    if (row['*ItemName']) item.itemBase = row['*ItemName'];
    if (num(row['lvl req'])) item.requiredLevel = num(row['lvl req']);
    else if (app.requiredLevel) item.requiredLevel = app.requiredLevel;
    const props = parseProps(row, 12);
    item.base_stats = computeBaseStats(row.code, props);
    item.stats = buildStats(props);
    if (m.how !== 'exact') report.unique.push(`${app.name} <- ${uniqDisplay(row)} [${m.how}]`);
  } else {
    if (app.requiredLevel) item.requiredLevel = app.requiredLevel;
    item.stats = legacyFallback(app, 10);
    report.unique.push(`${app.name} [UNMATCHED -> legacy]`);
  }
  if (item.base_stats == null) delete item.base_stats;
  return item;
});

// ---------------------------------------------------------------------------
// Generate set items
// ---------------------------------------------------------------------------
const setDisplay = (r) => r.index;
const setMatches = matchAll(appSets, SET, setDisplay, (r) => r['*ItemName']);

const outSets = appSets.map((app, idx) => {
  const m = setMatches[idx];
  const row = m && m.row;
  const item = { id: app.id, name: app.name, set: app.set, itemBase: app.itemBase };
  if (row) {
    if (row['*ItemName']) item.itemBase = row['*ItemName'];
    if (row.set) item.set = S(row.set) || row.set || app.set;
    if (num(row['lvl req'])) item.requiredLevel = num(row['lvl req']);
    else if (app.requiredLevel) item.requiredLevel = app.requiredLevel;
    const props = parseProps(row, 9);
    item.base_stats = computeBaseStats(row.item || row.code, props);
    item.stats = buildStats(props);
    if (m.how !== 'exact') report.set.push(`${app.name} <- ${setDisplay(row)} [${m.how}]`);
  } else {
    if (app.requiredLevel) item.requiredLevel = app.requiredLevel;
    item.stats = legacyFallback(app, 12);
    report.set.push(`${app.name} [UNMATCHED -> legacy]`);
  }
  if (item.base_stats == null) delete item.base_stats;
  return item;
});

// ---------------------------------------------------------------------------
// Generate runewords
// ---------------------------------------------------------------------------
const runewordRows = Object.values(RUNES).filter((r) => (r.complete === 1 || r.complete === '1'));
const rwDisplay = (r) => r['*Rune Name'] || r['Rune Name'] || r.Name;
const runeMatches = matchAll(appRunewords, runewordRows, rwDisplay, null);

function parseRuneProps(row) {
  const props = [];
  for (let i = 1; i <= 7; i++) {
    const code = row['T1Code' + i];
    if (!code || String(code).startsWith('*')) continue;
    props.push({ code, par: row['T1Param' + i], min: row['T1Min' + i], max: row['T1Max' + i] });
  }
  return props;
}

const outRunewords = appRunewords.map((app, idx) => {
  const m = runeMatches[idx];
  const row = m && m.row;
  const item = {
    id: app.id,
    name: app.name,
    base: app.base,
    requiredLevel: app.requiredLevel,
    runes: app.runes,
    itemTypes: app.itemTypes,
  };
  if (row) {
    const props = parseRuneProps(row);
    item.stats = buildStats(props);
    if (m.how !== 'exact') report.runeword.push(`${app.name} <- ${rwDisplay(row)} [${m.how}]`);
  } else {
    item.stats = legacyFallbackRuneword(app);
    report.runeword.push(`${app.name} [UNMATCHED -> legacy]`);
  }
  return item;
});

function legacyFallbackRuneword(app) {
  const override = LEGACY_OVERRIDES[norm(app.name)];
  if (override) return override.map((s) => ({ ...s }));
  const out = [];
  for (let i = 1; i <= 9; i++) {
    const text = app['stat' + i];
    if (!text) continue;
    out.push(statLine(`${text} {v}`, { min: num(app['min' + i]), max: num(app['max' + i]) }));
  }
  return out;
}

// ---------------------------------------------------------------------------
// Serialize
// ---------------------------------------------------------------------------
function serialize(value, indent = 0) {
  const pad = '  '.repeat(indent);
  const pad1 = '  '.repeat(indent + 1);
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return '[\n' + value.map((v) => pad1 + serialize(v, indent + 1)).join(',\n') + '\n' + pad + ']';
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    if (entries.length === 0) return '{}';
    return (
      '{\n' +
      entries
        .map(([k, v]) => `${pad1}${JSON.stringify(k)}: ${serialize(v, indent + 1)}`)
        .join(',\n') +
      '\n' +
      pad +
      '}'
    );
  }
  return JSON.stringify(value);
}

// Runewords need runes emitted as `Rune.X` enum references.
function serializeRuneword(rw, indent = 1) {
  const pad = '  '.repeat(indent);
  const pad1 = '  '.repeat(indent + 1);
  const lines = [];
  lines.push(`${pad1}"id": ${JSON.stringify(rw.id)}`);
  lines.push(`${pad1}"name": ${JSON.stringify(rw.name)}`);
  lines.push(`${pad1}"base": ${JSON.stringify(rw.base)}`);
  lines.push(`${pad1}"requiredLevel": ${JSON.stringify(rw.requiredLevel)}`);
  lines.push(`${pad1}"runes": [${rw.runes.map((r) => `Rune.${r}`).join(', ')}]`);
  lines.push(`${pad1}"itemTypes": ${serialize(rw.itemTypes, indent + 1)}`);
  if (rw.base_stats) lines.push(`${pad1}"base_stats": ${serialize(rw.base_stats, indent + 1)}`);
  lines.push(`${pad1}"stats": ${serialize(rw.stats, indent + 1)}`);
  return `{\n${lines.join(',\n')}\n${pad}}`;
}

const HEADER = '// AUTO-GENERATED by scripts/generateItems.mjs from D2R game data. Do not edit by hand.\n';

fs.writeFileSync(
  path.join(ROOT, 'src/data/UniqueItems.ts'),
  HEADER + `import type { UniqueItemType } from '../types';\n\nexport const UniqueItems: UniqueItemType[] = ${serialize(outUniques)};\n`,
);
fs.writeFileSync(
  path.join(ROOT, 'src/data/SetItems.ts'),
  HEADER + `import type { SetItemType } from '../types';\n\nexport const SetItems: SetItemType[] = ${serialize(outSets)};\n`,
);
fs.writeFileSync(
  path.join(ROOT, 'src/data/Runewords.ts'),
  HEADER +
    `import type { RunewordType } from '../types';\nimport { Rune } from '../types';\n\nexport const Runewords: RunewordType[] = [\n` +
    outRunewords.map((rw) => '  ' + serializeRuneword(rw, 1)).join(',\n') +
    `\n];\n`,
);

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
const reportText = [
  `Uniques: ${outUniques.length} (non-exact matches: ${report.unique.length})`,
  ...report.unique.map((l) => '  ' + l),
  ``,
  `Sets: ${outSets.length} (non-exact matches: ${report.set.length})`,
  ...report.set.map((l) => '  ' + l),
  ``,
  `Runewords: ${outRunewords.length} (non-exact matches: ${report.runeword.length})`,
  ...report.runeword.map((l) => '  ' + l),
  ``,
].join('\n');
fs.writeFileSync(path.join(CACHE, 'generation-report.txt'), reportText);
console.log(reportText);
