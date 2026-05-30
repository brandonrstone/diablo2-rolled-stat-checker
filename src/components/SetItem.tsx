import { useMemo } from 'react';

import { useStatDisplayMode } from '../hooks/useStatDisplayMode';
import { filterStats, getStats } from '../lib/rollable';
import type { SetItemType } from '../types';
import { ItemCard } from './ItemCard';
import { StatLineView } from './StatLineView';

export function SetItem(setItem: SetItemType) {
  const { mode } = useStatDisplayMode();

  const visibleStats = useMemo(() => filterStats(getStats(setItem), mode), [setItem, mode]);

  return (
    <ItemCard
      title={setItem.name}
      subtitle={setItem.itemBase}
      requiredLevel={setItem.requiredLevel}
      base={setItem.base_stats}
      type='set'
      imageUrl={setItem.imageUrl}
    >
      {visibleStats.map((stat, i) => (
        <div key={i} className='flex flex-col items-center justify-center w-full max-w-xs'>
          <StatLineView stat={stat} />
        </div>
      ))}
    </ItemCard>
  );
}
