import { useMemo } from 'react';

import { ItemCard } from './ItemCard';
import { StatLineView } from './StatLineView';
import { useStatDisplayMode } from '../hooks/useStatDisplayMode';
import { Charm, type UniqueItemType } from '../types';
import { filterStats, getStats } from '../lib/rollable';

export function UniqueItem(uniqueItem: UniqueItemType) {
  const { mode } = useStatDisplayMode();

  const visibleStats = useMemo(() => filterStats(getStats(uniqueItem), mode), [uniqueItem, mode]);

  const isCharm = (base?: string) => base === Charm.Grand || base === Charm.Large || base === Charm.Small;

  return (
    <ItemCard
      title={uniqueItem.name}
      subtitle={uniqueItem.itemBase}
      requiredLevel={uniqueItem.requiredLevel}
      base={uniqueItem.base_stats}
      type='unique'
      charmSubtitleGold={isCharm(uniqueItem.itemBase)}
      imageUrl={uniqueItem.imageUrl}
    >
      {visibleStats.map((stat, i) => (
        <div key={i} className='flex flex-col items-center justify-center w-full max-w-xs'>
          <StatLineView stat={stat} />
        </div>
      ))}
    </ItemCard>
  );
}
