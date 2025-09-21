import { useMemo } from 'react';

import { useStatDisplayMode } from '../hooks/useStatDisplayMode';
import { extractSetItemStats, filterExtracted } from '../lib/rollable';
import type { SetItemType } from '../types';
import { ItemCard } from './ItemCard';

export function SetItem(setItem: SetItemType) {
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
    const all = extractSetItemStats(setItem).filter(stat => stat.text);
    return filterExtracted(all, mode);
  }, [setItem, mode]);

  return (
    <ItemCard title={setItem.name} subtitle={setItem.itemBase} requiredLevel={setItem.requiredLevel} type="set">
      {visibleStats.map((stat, i) => {
        const roll = analyzeRoll(stat.min, stat.max);

        if (roll.kind === 'none') {
          return (
            <div className='text-center' key={stat.source ?? i}>
              <span className='text-blueish'>{stat.text}</span>
            </div>
          );
        }

        return (
          <div className='text-center' key={stat.source ?? i}>
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
    </ItemCard>
  );
}
