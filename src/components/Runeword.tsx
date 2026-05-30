import { Fragment, memo, useMemo } from 'react';

import { useStatDisplayMode } from '../hooks/useStatDisplayMode';
import type { RunewordType } from '../types';
import { filterStats, getStats } from '../lib/rollable';
import { ItemCard } from './ItemCard';
import { StatLineView } from './StatLineView';

export const Runeword = memo(function Runeword({ runeword }: { runeword: RunewordType }) {
  const { mode } = useStatDisplayMode();

  const visibleStats = useMemo(() => filterStats(getStats(runeword), mode), [runeword, mode]);

  return (
    <ItemCard
      title={runeword.name}
      subtitle={runeword.itemTypes.join(' / ')}
      requiredLevel={runeword.requiredLevel}
      base={runeword.base_stats}
      type='runeword'
      imageSlotContent={(
        <div className='inline-flex items-center justify-center gap-1.5 min-h-20'>
          {runeword.runes.map((rune, i) => (
            <img
              key={rune + i}
              src={runeIconSrc(rune)}
              alt={`${rune} rune`}
              className='w-12 h-12 object-contain select-none'
              loading='lazy'
              decoding='async'
            />
          ))}
        </div>
      )}
    >
      <div className='max-w-full text-gold whitespace-nowrap overflow-x-auto'>
        &apos;{runeword.runes.map((rune, i) => <Fragment key={rune + i}>{renderRuneInline(rune)}</Fragment>)}&apos;
      </div>

      <div className='text-muted'>Base: {runeword.base}</div>

      {visibleStats.map((stat, i) => (
        <div key={i} className='w-full max-w-xs flex flex-col items-center justify-center'>
          <StatLineView stat={stat} />
        </div>
      ))}
    </ItemCard>
  );
});

function runeIconSrc(rune: string) {
  return `/item-icons/runes/${rune.toLowerCase()}.png`;
}

function renderRuneInline(rune: string) {
  if (!rune) return null;
  const { head, tail } = { head: rune.slice(0, 1), tail: rune.slice(1) };
  return (
    <span className='inline-flex items-baseline whitespace-nowrap align-baseline'>
      <span className='text-[1.18em] leading-none'>{head}</span>
      <span className='text-[0.86em] leading-none'>{tail}</span>
    </span>
  );
}