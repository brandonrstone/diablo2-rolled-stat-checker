export type Rune =
  | 'El' | 'Eld' | 'Tir' | 'Nef' | 'Eth' | 'Ith' | 'Tal' | 'Ral' | 'Ort' | 'Thul'
  | 'Amn' | 'Sol' | 'Shael' | 'Dol' | 'Hel' | 'Io' | 'Lum' | 'Ko' | 'Fal' | 'Lem'
  | 'Pul' | 'Um' | 'Mal' | 'Ist' | 'Gul' | 'Vex' | 'Ohm' | 'Lo' | 'Sur' | 'Ber'
  | 'Jah' | 'Cham' | 'Zod';

export type RunewordStatIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type RunewordNumberedStatFields =
  { [I in RunewordStatIndex as `stat${I}`]?: string } &
  { [I in RunewordStatIndex as `min${I}`]?: number } &
  { [I in RunewordStatIndex as `max${I}`]?: number };

export interface RunewordType extends RunewordNumberedStatFields {
  id: string;
  name: string;
  base: string;
  requiredLevel: number;
  runes: Rune[];
  itemTypes: string[]
}

export const SET_STAT_INDEXES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type SetStatIndex = typeof SET_STAT_INDEXES[number];

export type SetPropKey = `prop${SetStatIndex}`;
export type SetMinKey = `min${SetStatIndex}`;
export type SetMaxKey = `max${SetStatIndex}`;
export type SetParKey = `par${SetStatIndex}`;

export type SetItemType = {
  id: number;
  name: string;
  set: string;
  itemBase: string;
  requiredLevel?: number;
  stat1?: string;
  min1?: number;
  max1?: number;
  stat2?: string;
  min2?: number;
  max2?: number;
  stat3?: string;
  min3?: number;
  max3?: number;
  stat4?: string;
  min4?: number;
  max4?: number;
  stat5?: string;
  min5?: number;
  max5?: number;
  stat6?: string;
  min6?: number;
  max6?: number;
  stat7?: string;
  min7?: number;
  max7?: number;
  stat8?: string;
  min8?: number;
  max8?: number;
  stat9?: string;
  min9?: number;
  max9?: number;
  stat10?: string;
  min10?: number;
  max10?: number;
  stat11?: string;
  min11?: number;
  max11?: number;
  stat12?: string;
  min12?: number;
  max12?: number;
};

export const STAT_INDEXES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type StatIndex = typeof STAT_INDEXES[number];

export type PropKey = `prop${StatIndex}`;
export type MinKey = `min${StatIndex}`;
export type MaxKey = `max${StatIndex}`;
export type ParKey = `par${StatIndex}`;

export type UniqueItemType = {
  id: number;
  name: string;
  requiredLevel?: number;
  itemBase?: string;
  base?: string;
  stat1?: string;
  min1?: number;
  max1?: number;
  stat2?: string;
  min2?: number;
  max2?: number;
  stat3?: string;
  min3?: number;
  max3?: number;
  stat4?: string;
  min4?: number;
  max4?: number;
  stat5?: string;
  min5?: number;
  max5?: number;
  stat6?: string;
  min6?: number;
  max6?: number;
  stat7?: string;
  min7?: number;
  max7?: number;
  stat8?: string;
  min8?: number;
  max8?: number;
  stat9?: string;
  min9?: number;
  max9?: number;
  stat10?: string;
  min10?: number;
  max10?: number;
};

