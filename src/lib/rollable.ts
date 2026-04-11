import { LocalStorageKey } from '../contexts/StatDisplayContext';
import type { RunewordType, SetItemType, UniqueItemType } from '../types';

export type ExtractedStat = {
  text: string;
  min?: number;
  max?: number;
  source?: string;
}

export function extractRunewordStats(runeword: RunewordType): ExtractedStat[] {
  const out: ExtractedStat[] = [];

  for (let i = 1; i <= 8; i++) {
    const key = `stat${i}` as keyof RunewordType;
    const minKey = `min${i}` as keyof RunewordType;
    const maxKey = `max${i}` as keyof RunewordType;

    const text = runeword[key];
    if (!text) continue;

    const min = numOrUndef(runeword[minKey]);
    const max = numOrUndef(runeword[maxKey]);

    out.push({ text: String(text), min, max, source: key as string });
  }

  return out;
}

export function extractSetItemStats(item: SetItemType): ExtractedStat[] {
  const out: ExtractedStat[] = [];

  // SetItems now use statN/minN/maxN (not propN)
  for (let i = 1; i <= 20; i++) {
    const key = `stat${i}` as keyof SetItemType;
    const minKey = `min${i}` as keyof SetItemType;
    const maxKey = `max${i}` as keyof SetItemType;

    const text = item[key];
    if (!text) continue;

    const min = numOrUndef(item[minKey]);
    // Only include max if it exists as a property on the item
    const max = Object.prototype.hasOwnProperty.call(item, maxKey)
      ? numOrUndef(item[maxKey])
      : undefined;

    out.push({ text: String(text), min, max, source: key as string });
  }

  return out;
}

export function extractUniqueItemStats(item: UniqueItemType): ExtractedStat[] {
  const out: ExtractedStat[] = [];
  for (let i = 1; i <= 20; i++) {
    const key = `stat${i}` as keyof UniqueItemType;
    const minKey = `min${i}` as keyof UniqueItemType;
    const maxKey = `max${i}` as keyof UniqueItemType;
    const p = item[key];
    if (!p) continue;
    const min = numOrUndef(item[minKey]);
    const max = numOrUndef(item[maxKey]);
    out.push({ text: String(p), min, max, source: `stat${i}` });
  }
  return out;
}

function numOrUndef(value: unknown): number | undefined {
  return isFiniteNumber(value) ? Number(value) : undefined;
}
function isFiniteNumber(x: unknown): x is number {
  return typeof x === 'number' && Number.isFinite(x);
}

export function isRollable(stat: ExtractedStat): boolean {
  if (typeof stat.min === 'number' && typeof stat.max === 'number') {
    return stat.min !== stat.max;
  }
  return false;
}

export function filterExtracted(stats: ExtractedStat[], mode: LocalStorageKey): ExtractedStat[] {
  if (mode === LocalStorageKey.All) return stats;
  return stats.filter(isRollable);
}
