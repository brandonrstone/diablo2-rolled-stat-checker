export type RuneName =
  | 'El' | 'Eld' | 'Tir' | 'Nef' | 'Eth' | 'Ith' | 'Tal' | 'Ral' | 'Ort' | 'Thul'
  | 'Amn' | 'Sol' | 'Shael' | 'Dol' | 'Hel' | 'Io' | 'Lum' | 'Ko' | 'Fal' | 'Lem'
  | 'Pul' | 'Um' | 'Mal' | 'Ist' | 'Gul' | 'Vex' | 'Ohm' | 'Lo' | 'Sur' | 'Ber'
  | 'Jah' | 'Cham' | 'Zod';

export type PatchRelease =
  | 109 | 110 | 111
  | 'Previously Ladder Only'
  | 'D2R Ladder 1'
  | string;

export interface StatLine {
  code: string;
  min?: number;
  max?: number;
  /** optional extra data (per-level params, skill ids, etc.) */
  params?: Array<string | number>;
}

export interface RunewordType {
  id: string;
  name: string;
  base?: string;
  requiredLevel: number;
  complete: 0 | 1 | boolean;
  patchRelease: PatchRelease;
  server?: 0 | 1;

  itemTypes?: string[];

  runes?: RuneName[];

  stats?: StatLine[];

  itype1?: string; itype2?: string; itype3?: string;
  RequiredRunes?: string;
  Rune1?: RuneName; Rune2?: RuneName; Rune3?: RuneName;
  Rune4?: RuneName; Rune5?: RuneName; Rune6?: RuneName; Rune7?: RuneName;

  [legacyKey: string]: unknown;
}

export type SetItemType = Record<string, any>
export type UniqueItemType = Record<string, any>