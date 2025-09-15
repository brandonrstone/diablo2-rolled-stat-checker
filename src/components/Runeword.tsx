import { Fragment, memo } from 'react';

import type { RunewordType } from '../types';

type Props = { runeword: RunewordType };

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
  if (Array.isArray(runeword.runes) && runeword.runes.length) return runeword.runes as string[];

  const runes: string[] = [];
  for (let i = 1; i <= 7; i++) {
    const rune = runeword[`Rune${i}` as keyof RunewordType] as unknown as string | undefined;
    if (rune) runes.push(rune);
  }
  if (runes.length) return runes;

  return [];
}

function collectItemTypes(runeword: RunewordType): string[] {
  if (Array.isArray(runeword.itemTypes) && runeword.itemTypes.length) return runeword.itemTypes;
  return [runeword.itype1, runeword.itype2, runeword.itype3].filter(Boolean) as string[];
}

/** Prefer canonical stats list; fall back to Stat1..Stat10 + Min/Max fields. */
type LegacyStat = { code: string; min?: number; max?: number };
function collectStats(runeword: RunewordType): LegacyStat[] {
  if (Array.isArray(runeword.stats) && runeword.stats.length) {
    return runeword.stats.map(s => ({ code: s.code, min: s.min, max: s.max }));
  }
  const stats: LegacyStat[] = [];
  for (let i = 1; i <= 10; i++) {
    const code = runeword[`Stat${i}` as keyof RunewordType] as unknown as string | undefined;
    if (!code) continue;
    const min = runeword[`Stat${i}Min` as keyof RunewordType] as unknown as number | undefined;
    const max = runeword[`Stat${i}Max` as keyof RunewordType] as unknown as number | undefined;
    stats.push({ code, min, max });
  }
  return stats;
}

function analyzeRoll(min?: number, max?: number):
  | { kind: 'none' }
  | { kind: 'fixed'; value: number }
  | { kind: 'variable'; low: number; high: number } {
  const hasMin = typeof min === 'number' && !Number.isNaN(min);
  const hasMax = typeof max === 'number' && !Number.isNaN(max);
  if (hasMin && hasMax) {
    const low = Math.min(min as number, max as number);
    const high = Math.max(min as number, max as number);
    return low === high ? { kind: 'fixed', value: low } : { kind: 'variable', low, high };
  }
  if (hasMin) return { kind: 'fixed', value: min as number };
  if (hasMax) return { kind: 'fixed', value: max as number };
  return { kind: 'none' };
}

export const Runeword = memo(function Runeword({ runeword }: Props) {
  const runes = collectRunes(runeword);
  const types = collectItemTypes(runeword);
  const stats = collectStats(runeword);

  return (
    <div
      className='w-full grid justify-items-center text-center px-4 py-4 rounded-lg bg-black text-blueish shadow-[0_1px_8px_rgba(0,0,0,0.35)]
      transition-transform duration-150 ease-out hover:-translate-y-[1px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.45)] [content-visibility:auto]
      font-exocet font-semibold text-lg'
      style={{ containIntrinsicSize: '200px' }}
    >
      <div className='text-gold [font-size:clamp(1.1rem,1rem+0.5vw,1.35rem)]'>{runeword.name}</div>

      {types.length > 0 && (
        <div className='text-muted-2 [font-size:1.05rem]'>{types.join(' / ')}</div>
      )}

      {runes.length > 0 && (
        <div className='text-gold whitespace-nowrap overflow-x-auto max-w-full'>
          &apos;
          {runes.map((r, i) => <Fragment key={r + i}>{renderRuneInline(r)}</Fragment>)}
          &apos;
        </div>
      )}

      {runeword.base && <div className='text-muted'>Base: {runeword.base}</div>}
      <div className='text-white'>Required Level: {runeword.requiredLevel ?? '—'}</div>

      <div className='w-full'>
        {stats.map((stat, idx) => {
          if (!stat.code) return null;
          const roll = analyzeRoll(stat.min, stat.max);
          return (
            <div className='grid items-center justify-items-center' key={`${stat.code}-${idx}`}>
              <div className='text-blueish'>{stat.code}</div>
              {roll.kind === 'variable' ? (
                <div>
                  <span className='text-roll-min'>{roll.low}</span>
                  {' - '}
                  <span className='text-roll-max'>{roll.high}</span>
                </div>
              ) : roll.kind === 'fixed' ? (
                <div><span className='text-white'>{roll.value}</span></div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
});
