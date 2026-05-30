import { LocalStorageKey } from '../contexts/StatDisplayContext';
import type { RunewordType, SetItemType, StatLine, UniqueItemType } from '../types';

export function isRollable(stat: StatLine): boolean {
  return stat.kind === 'roll';
}

/** Order stats by in-game display priority (higher first), preserving input order on ties. */
export function orderedStats(stats: StatLine[]): StatLine[] {
  return stats
    .map((s, i) => ({ s, i }))
    .sort((a, b) => (b.s.order ?? 0) - (a.s.order ?? 0) || a.i - b.i)
    .map(({ s }) => s);
}

export function getStats(item: UniqueItemType | SetItemType | RunewordType): StatLine[] {
  return orderedStats(item.stats ?? []);
}

export function filterStats(stats: StatLine[], mode: LocalStorageKey): StatLine[] {
  if (mode === LocalStorageKey.Rollable) return stats.filter(isRollable);
  return stats;
}
