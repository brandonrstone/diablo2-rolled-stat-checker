import { Fragment, memo, useMemo } from 'react';

import { useStatDisplayMode } from '../hooks/useStatDisplayMode';
import type { Rune, RunewordType } from '../types';
import { extractRunewordStats, filterExtracted } from '../lib/rollable';
import { ItemCard } from './ItemCard';

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

function collectRunes(runeword: RunewordType): string[] {
  return Array.isArray(runeword.runes) ? (runeword.runes as Rune[]) : [];
}

function collectItemTypes(runeword: RunewordType): string[] {
  return [runeword.itemType1, runeword.itemType2, runeword.itemType3].filter(Boolean) as string[];
}

function analyzeRoll(
  min?: number,
  max?: number
): { kind: 'none' } | { kind: 'fixed'; value: number } | { kind: 'variable'; low: number; high: number } {
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

export const Runeword = memo(function Runeword({ runeword }: { runeword: RunewordType }) {
  const { mode } = useStatDisplayMode();

  const runes = collectRunes(runeword);
  const types = collectItemTypes(runeword);

  const visibleStats = useMemo(() => {
    // assumes extractRunewordStats knows how to read stat1..stat8/min/max
    const all = extractRunewordStats(runeword);
    return filterExtracted(all, mode);
  }, [runeword, mode]);

  return (
    <ItemCard title={runeword.name} subtitle={types.length > 0 ? types.join(' / ') : undefined} requiredLevel={runeword.requiredLevel} type='runeword'>
      {runes.length > 0 && (
        <div className='max-w-full text-[var(--color-gold)] whitespace-nowrap overflow-x-auto'>
          &apos;{runes.map((rune, i) => <Fragment key={rune + i}>{renderRuneInline(rune)}</Fragment>)}&apos;
        </div>
      )}

      {runeword.base && <div className='text-[var(--color-muted)]'>Base: {runeword.base}</div>}

      {visibleStats.map((stat, i) => {
        const roll = analyzeRoll(stat.min, stat.max);
        return (
          <div key={stat.source ?? i} className='flex flex-col items-center justify-center w-full max-w-xs'>
            <span className='text-[var(--color-blueish)] text-center break-words'>{stat.text} </span>
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
});
