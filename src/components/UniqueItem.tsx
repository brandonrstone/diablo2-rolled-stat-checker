import { Fragment } from 'react';
import useItemValidation from '../hooks/useItemValidation';
import type { UniqueItemType } from '../types';

export function UniqueItem(uniqueItem: UniqueItemType) {
  const { isValidStat } = useItemValidation();

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

  const renderLine = (idx: number) => {
    const code = uniqueItem[`prop${idx}`] as string | undefined;
    if (!isValidStat(code ?? '')) return null;

    const min = uniqueItem[`min${idx}`] as number | undefined;
    const max = uniqueItem[`max${idx}`] as number | undefined;

    const roll = analyzeRoll(min, max);

    if (roll.kind === 'none') {
      return (
        <div className="grid justify-items-center">
          <span className="text-gold">{code}</span>
        </div>
      );
    }

    return (
      <div className="grid justify-items-center gap-0.5">
        <div><span className="text-gold">{code}</span></div>

        {roll.kind === 'variable' ? (
          <div>
            <span className="text-roll-min">{roll.low}</span>
            {' - '}
            <span className="text-roll-max">{roll.high}</span>
          </div>
        ) : (
          <div><span className="text-white">{roll.value}</span></div>
        )}
      </div>
    );
  };

  const base = uniqueItem.itemBase;
  const baseClass = isCharm(base) ? 'text-gold' : 'text-muted-2';

  return (
    <div
      className="
        grid justify-items-center text-center w-full
        px-4 py-4 rounded-lg bg-black text-blueish
        shadow-[0_1px_8px_rgba(0,0,0,0.35)]
        transition-transform duration-150 ease-out
        hover:-translate-y-[1px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.45)]
        [content-visibility:auto]
        font-exocet font-semibold
      "
      style={{ containIntrinsicSize: '200px' }}
    >
      <div className="text-gold [font-size:clamp(1.1rem,1rem+0.5vw,1.35rem)]">
        {uniqueItem.name}
      </div>

      <div className={baseClass}>{base}</div>

      <div className="text-white">
        Required Level: {uniqueItem.requiredLevel ?? '—'}
      </div>

      <div className="mt-1 w-full grid gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
          <Fragment key={i}>{renderLine(i)}</Fragment>
        ))}
      </div>
    </div>
  );
}
