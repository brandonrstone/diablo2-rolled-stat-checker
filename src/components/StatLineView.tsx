import { Fragment } from 'react';
import type { BaseStats, StatLine } from '../types';

/** A rolled range rendered as red(min) - green(max). */
function RangeValue({ min, max }: { min: number; max: number }) {
  return (
    <span className='whitespace-nowrap'>
      <span className='text-roll-min'>{min}</span>
      {'-'}
      <span className='text-roll-max'>{max}</span>
    </span>
  );
}

function FixedValue({ value }: { value: number }) {
  return <span className='text-white'>{value}</span>;
}

/**
 * Renders a single item modifier inline, e.g. "+25% Faster Cast Rate" or
 * "+10-15% to Lightning Skill Damage" (with the range coloured red/green).
 */
export function StatLineView({ stat }: { stat: StatLine }) {
  const parts = stat.template.split('{v}');

  // Lines without a numeric placeholder (e.g. "Indestructible").
  if (parts.length === 1) {
    return <span className='text-blueish text-center break-words'>{stat.template}</span>;
  }

  const hasMin = typeof stat.min === 'number';
  const hasMax = typeof stat.max === 'number';
  const isRange = stat.kind === 'roll' && hasMin && hasMax && stat.min !== stat.max;
  const fixedValue = hasMin ? (stat.min as number) : hasMax ? (stat.max as number) : undefined;
  const leadValue = isRange ? (stat.min as number) : fixedValue;
  const sign = stat.signed && typeof leadValue === 'number' && leadValue >= 0 ? '+' : '';

  return (
    <span className='text-blueish text-center break-words'>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <>
              {sign}
              {isRange ? (
                <RangeValue min={stat.min as number} max={stat.max as number} />
              ) : typeof fixedValue === 'number' ? (
                <FixedValue value={fixedValue} />
              ) : null}
            </>
          )}
        </Fragment>
      ))}
    </span>
  );
}

type BaseRow = { label: string; min?: number; max?: number; suffix?: string };

function baseRows(base: BaseStats): BaseRow[] {
  const rows: BaseRow[] = [];
  if (base.defenseMin != null) rows.push({ label: 'Defense:', min: base.defenseMin, max: base.defenseMax });
  if (base.damageMin != null) rows.push({ label: 'One-Hand Damage:', min: base.damageMin, max: base.damageMax });
  if (base.twoHandDamageMin != null)
    rows.push({ label: 'Two-Hand Damage:', min: base.twoHandDamageMin, max: base.twoHandDamageMax });
  if (base.throwDamageMin != null)
    rows.push({ label: 'Throw Damage:', min: base.throwDamageMin, max: base.throwDamageMax });
  if (base.block != null) rows.push({ label: 'Chance to Block:', min: base.block, suffix: '%' });
  if (base.durability != null) rows.push({ label: 'Durability:', min: base.durability });
  return rows;
}

/** Renders the intrinsic base-item stats shown above the magic mods. */
export function BaseStatsView({ base, requiredLevel }: { base?: BaseStats; requiredLevel?: number }) {
  const rows = base ? baseRows(base) : [];
  const showAnything = rows.length > 0 || requiredLevel != null || base?.reqStr != null || base?.reqDex != null;
  if (!showAnything) return null;

  const renderValue = (row: BaseRow) => {
    if (row.max != null && row.min != null && row.max !== row.min) {
      return (
        <>
          <span className='text-roll-min'>{row.min}</span>
          {'-'}
          <span className='text-roll-max'>{row.max}</span>
          {row.suffix}
        </>
      );
    }
    return (
      <span className='text-white'>
        {row.min ?? row.max}
        {row.suffix}
      </span>
    );
  };

  return (
    <div className='w-full flex flex-col items-center text-white/90'>
      {rows.map((row) => (
        <div key={row.label}>
          {row.label} {renderValue(row)}
        </div>
      ))}
      {requiredLevel != null && <div>Required Level: {requiredLevel}</div>}
      {base?.reqStr != null && <div>Required Strength: {base.reqStr}</div>}
      {base?.reqDex != null && <div>Required Dexterity: {base.reqDex}</div>}
    </div>
  );
}
