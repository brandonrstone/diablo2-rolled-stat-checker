import { useMemo } from 'react';

import useItemValidation from '../hooks/useItemValidation';
import { useStatDisplayMode } from '../hooks/useStatDisplayMode';
import { extractSetItemStats, filterExtracted } from '../lib/rollable';
import type { SetItemType } from '../types';

export function SetItem(setItem: SetItemType) {
  const { isValidStat } = useItemValidation();
  const { mode } = useStatDisplayMode();

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

  const visibleStats = useMemo(() => {
    const all = extractSetItemStats(setItem).filter(stat => isValidStat(stat.text));
    return filterExtracted(all, mode);
  }, [setItem, isValidStat, mode]);

  return (
    <div
      className='grid justify-items-center text-center w-full p-4 rounded-lg bg-black text-blueish
      shadow-[0_1px_8px_rgba(0,0,0,0.35)] transition-transform duration-150 ease-out hover:-translate-y-[1px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.45)]
      [content-visibility:auto] font-exocet font-semibold text-xl'
      style={{ containIntrinsicSize: '200px' }}
    >
      <div className='text-[rgb(3,192,34)] [font-size:clamp(1.1rem,1rem+0.5vw,1.35rem)]'>{setItem.name}</div>

      <div className='text-muted'>{setItem.itemBase}</div>
      <div className='text-white'>Required Level: {setItem.requiredLevel ?? '—'}</div>

      <div className='mt-1 w-full grid gap-1'>
        {visibleStats.map((stat, i) => {
          const roll = analyzeRoll(stat.min, stat.max);

          if (roll.kind === 'none') {
            return (
              <div className='grid justify-items-center' key={stat.source ?? i}>
                <span className='text-blueish'>{stat.text}</span>
              </div>
            );
          }

          return (
            <div className='grid justify-items-center' key={stat.source ?? i}>
              <div><span className='text-blueish'>{stat.text}</span></div>
              {roll.kind === 'variable' ? (
                <div><span className='text-roll-min'>{roll.low}</span>{' - '}<span className='text-roll-max'>{roll.high}</span></div>
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
