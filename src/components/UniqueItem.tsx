import { useMemo } from 'react';

import { ItemCard } from './ItemCard';
import { useStatDisplayMode } from '../hooks/useStatDisplayMode';
import type { UniqueItemType } from '../types';
import { extractUniqueItemStats, filterExtracted } from '../lib/rollable';

export function UniqueItem(uniqueItem: UniqueItemType) {
  const { mode } = useStatDisplayMode();

  type Roll =
    | { kind: 'none' }
    | { kind: 'fixed'; value: number }
    | { kind: 'variable'; low: number; high: number };

  function analyzeRoll(min?: number, max?: number): Roll {
    if (min && max) {
      const low = Math.min(min, max);
      const high = Math.max(min, max);
      if (low === high) return { kind: 'fixed', value: low };
      return { kind: 'variable', low, high };
    }
    if (min) return { kind: 'fixed', value: min };
    if (max) return { kind: 'fixed', value: max };
    return { kind: 'none' };
  }

  const visibleStats = useMemo(() => {
    const all = extractUniqueItemStats(uniqueItem).filter(stat => stat.text);
    return filterExtracted(all, mode);
  }, [uniqueItem, mode]);

  const isCharm = (base?: string) => base === 'Grand Charm' || base === 'Large Charm' || base === 'Small Charm';

  return (
    <ItemCard title={uniqueItem.name} subtitle={uniqueItem.itemBase} requiredLevel={uniqueItem.requiredLevel} type='unique' charmSubtitleGold={isCharm(uniqueItem.itemBase)}>
      {visibleStats.map((stat, i) => {
        const roll = analyzeRoll(stat.min, stat.max);

        return (
          <div key={stat.source ?? i} className='flex flex-col items-center justify-center w-full max-w-xs'>
            <span className='text-[var(--color-blueish)] text-center break-words'>
              {stat.text}
            </span>
            {roll.kind === 'variable' && (
              <div>
                <span className='text-[var(--color-roll-min)]'>{roll.low}</span>
                {' - '}
                <span className='text-[var(--color-roll-max)]'>{roll.high}</span>
              </div>
            )}
            {roll.kind === 'fixed' && (
              <div>
                <span className='text-white'>{roll.value}</span>
              </div>
            )}
          </div>
        );
      })}
    </ItemCard>
  );
}
