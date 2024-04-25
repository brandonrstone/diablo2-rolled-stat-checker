import { Fragment } from 'react'

import type { RunewordType } from '../types'

const Runeword: React.FC = (runeward: RunewordType): JSX.Element => (
  <div className='runeword-container'>
    <div className='runeword-name'>{runeward.name}</div>
    <div className='item-base'>{runeward.itype1}</div>
    <div className='runeword-runes'>
      {/* I had to do this trash because the font was impossible to find & it doesn't have lower case :D */}
      '{runeward.Rune1.substring(0, 1)}<span style={{ fontSize: 18 }}>{runeward.Rune1.substring(1, runeward.Rune1.length)}</span>
      {runeward.Rune2.substring(0, 1)}<span style={{ fontSize: 18 }}>{runeward.Rune2.substring(1, runeward.Rune2.length)}</span>
      {runeward.Rune3 != null && runeward.Rune3.substring(0, 1)}{runeward.Rune3 != null && <span style={{ fontSize: 18 }}>{runeward.Rune3.substring(1, runeward.Rune3.length)}</span>}
      {runeward.Rune4 != null && runeward.Rune4.substring(0, 1)}{runeward.Rune4 != null && <span style={{ fontSize: 18 }}>{runeward.Rune4.substring(1, runeward.Rune4.length)}</span>}
      {runeward.Rune5 != null && runeward.Rune5.substring(0, 1)}{runeward.Rune5 != null && <span style={{ fontSize: 18 }}>{runeward.Rune5.substring(1, runeward.Rune5.length)}</span>}'
    </div>
    <div className='item-requirements'>Required Level: {runeward.requiredLevel}</div>
    {[1, 2, 3, 4, 5, 6, 7].map(stat => (
      <Fragment key={stat}>
        {runeward[`Stat${stat}Min`] < runeward[`Stat${stat}Max`] && (
          <div>
            <div>{runeward[`Stat${stat}`] && <span>{runeward[`Stat${stat}`]}</span>}</div>
            <span className='runeword-min-roll'>{runeward[`Stat${stat}Min`]}</span> -{' '}
            <span className='runeword-max-roll'>{runeward[`Stat${stat}Max`]}</span>
          </div>
        )}
      </Fragment>
    ))}
  </div>
)

export default Runeword