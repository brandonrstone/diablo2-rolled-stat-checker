import { Fragment, memo, useMemo } from 'react';

import { useStatDisplayMode } from '../hooks/useStatDisplayMode';
import type { RunewordType } from '../types';
import { extractRunewordStats, filterExtracted } from '../lib/rollable';
import { ItemCard } from './ItemCard';

export const Runeword = memo(function Runeword({ runeword }: { runeword: RunewordType }) {
  const { mode } = useStatDisplayMode();

  const visibleStats = useMemo(() => {
    const all = extractRunewordStats(runeword);
    return filterExtracted(all, mode);
  }, [runeword, mode]);

  return (
    <ItemCard title={runeword.name} subtitle={runeword.itemTypes.join(' / ')} requiredLevel={runeword.requiredLevel} type='runeword'>
      <div className='max-w-full text-gold whitespace-nowrap overflow-x-auto'>
        &apos;{runeword.runes.map((rune, i) => <Fragment key={rune + i}>{renderRuneInline(rune)}</Fragment>)}&apos;
      </div>

      <div className='text-muted'>Base: {runeword.base}</div>

      {visibleStats.map((stat, i) => {
        const roll = analyzeRoll(stat.min, stat.max);
        return (
          <div key={stat.source ?? i} className='w-full max-w-xs flex flex-col items-center justify-center'>
            <span className='text-blueish text-center'>{stat.text}</span>
            {roll.kind === 'variable' && (
              <div>
                <span className='text-roll-min'>{roll.low}</span>
                {' - '}
                <span className='text-roll-max'>{roll.high}</span>
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
});

function renderRuneInline(rune: string) {
  if (!rune) return null;
  const { head, tail } = { head: rune.slice(0, 1), tail: rune.slice(1) }
  return (
    <span className='inline-flex items-baseline whitespace-nowrap align-baseline'>
      <span className='text-[1.18em] leading-none'>{head}</span>
      <span className='text-[0.86em] leading-none'>{tail}</span>
    </span>
  );
}

function analyzeRoll(min?: number, max?: number) {
  const hasMin = typeof min === 'number' && !Number.isNaN(min);
  const hasMax = typeof max === 'number' && !Number.isNaN(max);
  if (hasMin && hasMax) {
    const low = Math.min(min!, max!);
    const high = Math.max(min!, max!);
    return low === high ? { kind: 'fixed', value: low } : { kind: 'variable', low, high };
  }
  if (hasMin) return { kind: 'fixed', value: min! };
  if (hasMax) return { kind: 'fixed', value: max! };
  return { kind: 'none' };
}