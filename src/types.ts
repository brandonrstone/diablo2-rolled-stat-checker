export enum Rune {
  El = 'El',
  Eld = 'Eld',
  Tir = 'Tir',
  Nef = 'Nef',
  Eth = 'Eth',
  Ith = 'Ith',
  Tal = 'Tal',
  Ral = 'Ral',
  Ort = 'Ort',
  Thul = 'Thul',
  Amn = 'Amn',
  Sol = 'Sol',
  Shael = 'Shael',
  Dol = 'Dol',
  Hel = 'Hel',
  Io = 'Io',
  Lum = 'Lum',
  Ko = 'Ko',
  Fal = 'Fal',
  Lem = 'Lem',
  Pul = 'Pul',
  Um = 'Um',
  Mal = 'Mal',
  Ist = 'Ist',
  Gul = 'Gul',
  Vex = 'Vex',
  Ohm = 'Ohm',
  Lo = 'Lo',
  Sur = 'Sur',
  Ber = 'Ber',
  Jah = 'Jah',
  Cham = 'Cham',
  Zod = 'Zod'
}

export enum Charm {
  Small = 'Small Charm',
  Large = 'Large Charm',
  Grand = 'Grand Charm',
}

/**
 * A single displayable item modifier.
 *
 * `template` is the fully-formatted in-game line with one `{v}` placeholder
 * marking where the numeric value(s) belong, e.g. "{v} Defense",
 * "{v}% Faster Cast Rate", "{v} to All Skills". Lines that have no number
 * (e.g. "Indestructible") simply omit the placeholder.
 *
 * `signed` indicates the game prefixes a `+` for non-negative values.
 *
 * `kind` is `roll` when the value rolls within a range (`min !== max`) and is
 * rendered with the red (min) / green (max) colour scheme; otherwise `fixed`.
 */
export type StatKind = 'fixed' | 'roll';

export interface StatLine {
  template: string;
  signed?: boolean;
  min?: number;
  max?: number;
  kind: StatKind;
  /** In-game display priority (higher shows first). */
  order?: number;
}

/** Intrinsic stats of the underlying base item (shown above the magic mods). */
export interface BaseStats {
  defenseMin?: number;
  defenseMax?: number;
  durability?: number;
  reqStr?: number;
  reqDex?: number;
  block?: number;
  damageMin?: number;
  damageMax?: number;
  twoHandDamageMin?: number;
  twoHandDamageMax?: number;
  throwDamageMin?: number;
  throwDamageMax?: number;
}

export interface RunewordType {
  id: string;
  name: string;
  base: string;
  requiredLevel: number;
  runes: Rune[];
  itemTypes: string[];
  imageUrl?: string;
  base_stats?: BaseStats;
  stats: StatLine[];
}

export type SetItemType = {
  id: number;
  name: string;
  set: string;
  itemBase: string;
  imageUrl?: string;
  requiredLevel?: number;
  base_stats?: BaseStats;
  stats: StatLine[];
};

export type UniqueItemType = {
  id: number;
  name: string;
  requiredLevel?: number;
  itemBase?: string;
  base?: string;
  imageUrl?: string;
  base_stats?: BaseStats;
  stats: StatLine[];
};

