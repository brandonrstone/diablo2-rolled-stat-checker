import type { RunewordType, SetItemType, UniqueItemType } from '../types';

export type ExtractedStat = {
  text: string;
  min?: number;
  max?: number;
  source?: string;
}

export function extractRunewordStats(runeword: RunewordType): ExtractedStat[] {
  const out: ExtractedStat[] = [];
  for (let i = 1; i <= 12; i++) {
    const key = `Stat${i}`;
    const text = runeword[key];
    if (!text) continue;

    const minK = `${key}Min`;
    const maxK = `${key}Max`;
    const min = isFiniteNumber(runeword[minK]) ? Number(runeword[minK]) : undefined;
    const max = isFiniteNumber(runeword[maxK]) ? Number(runeword[maxK]) : undefined;

    out.push({ text: String(text), min, max, source: key });
  }
  return out;
}

export function extractSetItemStats(item: SetItemType): ExtractedStat[] {
  const out: ExtractedStat[] = [];

  for (let i = 1; i <= 20; i++) {
    const p = item[`prop${i}`];
    if (!p) continue;
    const min = numOrUndef(item[`min${i}`]);
    const max = numOrUndef(item[`max${i}`]);
    out.push({ text: String(p), min, max, source: `prop${i}` });
  }

  for (let i = 1; i <= 20; i++) {
    const p = item[`aprop${i}a`];
    if (!p) continue;

    const min = numOrUndef(item[`amin${i}a`]);
    const max = numOrUndef(item[`amax${i}a`]);
    out.push({ text: String(p), min, max, source: `aprop${i}a` });
  }

  return out;
}

export function extractUniqueItemStats(item: UniqueItemType): ExtractedStat[] {
  const out: ExtractedStat[] = [];
  for (let i = 1; i <= 20; i++) {
    const p = item[`prop${i}`];
    if (!p) continue;
    const min = numOrUndef(item[`min${i}`]);
    const max = numOrUndef(item[`max${i}`]);
    out.push({ text: String(p), min, max, source: `prop${i}` });
  }
  return out;
}

function numOrUndef(v: any): number | undefined {
  return isFiniteNumber(v) ? Number(v) : undefined;
}
function isFiniteNumber(x: any): x is number {
  return typeof x === 'number' && Number.isFinite(x);
}

export function isRollable(stat: ExtractedStat): boolean {
  if (typeof stat.min === 'number' && typeof stat.max === 'number') {
    return stat.min !== stat.max;
  }
  return false;
}

export function filterExtracted(stats: ExtractedStat[], mode: 'all' | 'rollable'): ExtractedStat[] {
  if (mode === 'all') return stats;
  return stats.filter(isRollable);
}
