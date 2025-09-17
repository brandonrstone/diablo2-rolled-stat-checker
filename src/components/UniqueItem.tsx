import { useMemo } from 'react';
import useItemValidation from '../hooks/useItemValidation';
import { useStatDisplayMode } from '../hooks/useStatDisplayMode';
import type { UniqueItemType } from '../types';
import { extractUniqueItemStats, filterExtracted } from '../lib/rollable';

export function UniqueItem(uniqueItem: UniqueItemType) {
  const { isValidStat } = useItemValidation();
  const { mode } = useStatDisplayMode();

  const isCharm = (base?: string) =>
    base === 'Grand Charm' || base === 'Large Charm' || base === 'Small Charm';

  type Roll =
    | { kind: 'none' }
    | { kind: 'fixed'; value: number }
    | { kind: 'variable'; low: number; high: number };

  function analyzeRoll(min?: number, max?: number): Roll {
    const hasMin = typeof min === 'number' && !Number.isNaN(min);
    const hasMax = typeof max === 'number' && !Number.isNaN(max);
    if (hasMin && hasMax) {
      const low = Math.min(min as number, max as number);
      const high = Math.max(min as number, max as number);
      if (low === high) return { kind: 'fixed', value: low };
      return { kind: 'variable', low, high };
    }
    if (hasMin) return { kind: 'fixed', value: min as number };
    if (hasMax) return { kind: 'fixed', value: max as number };
    return { kind: 'none' };
  }

  // Build the exact list of *visible* stats (no empty props, filtered by mode)
  const visibleStats = useMemo(() => {
    const all = extractUniqueItemStats(uniqueItem)
      .filter(stat => isValidStat(stat.text)); // drop invalid/placeholder lines
    return filterExtracted(all, mode);     // 'all' or 'rollable'
  }, [uniqueItem, isValidStat, mode]);

  const base = uniqueItem.itemBase;
  const baseClass = isCharm(base) ? 'text-gold' : 'text-muted-2';

  return (
    <div
      className='grid justify-items-center text-center w-full p-4 rounded-lg bg-black text-blueish
      shadow-[0_1px_8px_rgba(0,0,0,0.35)] transition-transform duration-150 ease-out hover:shadow-[0_6px_18px_rgba(0,0,0,0.45)]
      [content-visibility:auto] font-exocet font-semibold text-xl'
      style={{ containIntrinsicSize: '200px' }}
    >
      <div className='text-gold'>{uniqueItem.name}</div>
      <div className={baseClass}>{base}</div>
      <div className='text-white'>Required Level: {uniqueItem.requiredLevel ?? '—'}</div>

      <div className='mt-1 w-full grid gap-1'>
        {visibleStats.map((stat, i) => {
          const roll = analyzeRoll(stat.min, stat.max);

          if (roll.kind === 'none') {
            return (
              <div className='grid justify-items-center' key={stat.source ?? i}>
                <span className='text-gold'>{stat.text}</span>
              </div>
            );
          }

          return (
            <div className='grid justify-items-center' key={stat.source ?? i}>
              <div><span className='text-blueish'>{stat.text}</span></div>
              {roll.kind === 'variable' ? (
                <div>
                  <span className='text-roll-min'>{roll.low}</span>
                  {' - '}
                  <span className='text-roll-max'>{roll.high}</span>
                </div>
              ) : (
                <div><span className='text-white'>{roll.value}</span></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
