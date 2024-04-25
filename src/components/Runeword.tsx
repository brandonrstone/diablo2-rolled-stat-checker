import { Fragment } from 'react'

import type { RunewordType } from '../types'

const Runeword: React.FC = (runeword: RunewordType): JSX.Element => (
  <div className='runeword-container'>
    <div className='runeword-name'>{runeword.name}</div>
    <div className='item-base'>{runeword.itype1}</div>
    <div className='runeword-runes'>
      {/* I had to do this trash because the font was impossible to find & it doesn't have lower case :D */}
      '{runeword.Rune1.substring(0, 1)}<span style={{ fontSize: 18 }}>{runeword.Rune1.substring(1, runeword.Rune1.length)}</span>
      {runeword.Rune2.substring(0, 1)}<span style={{ fontSize: 18 }}>{runeword.Rune2.substring(1, runeword.Rune2.length)}</span>
      {runeword.Rune3 != null && runeword.Rune3.substring(0, 1)}{runeword.Rune3 != null && <span style={{ fontSize: 18 }}>{runeword.Rune3.substring(1, runeword.Rune3.length)}</span>}
      {runeword.Rune4 != null && runeword.Rune4.substring(0, 1)}{runeword.Rune4 != null && <span style={{ fontSize: 18 }}>{runeword.Rune4.substring(1, runeword.Rune4.length)}</span>}
      {runeword.Rune5 != null && runeword.Rune5.substring(0, 1)}{runeword.Rune5 != null && <span style={{ fontSize: 18 }}>{runeword.Rune5.substring(1, runeword.Rune5.length)}</span>}
      {runeword.Rune6 != null && runeword.Rune6.substring(0, 1)}{runeword.Rune6 != null && <span style={{ fontSize: 18 }}>{runeword.Rune6.substring(1, runeword.Rune6.length)}</span>}'
    </div>
    <div className='item-requirements'>Required Level: {runeword.requiredLevel}</div>
    {[1, 2, 3, 4, 5, 6, 7].map(stat => (
      <Fragment key={stat}>
        {runeword[`Stat${stat}Min`] < runeword[`Stat${stat}Max`] && (
          <div>
            <div>{runeword[`Stat${stat}`] && <span>{runeword[`Stat${stat}`]}</span>}</div>
            <span className='runeword-min-roll'>{runeword[`Stat${stat}Min`]}</span> -{' '}
            <span className='runeword-max-roll'>{runeword[`Stat${stat}Max`]}</span>
          </div>
        )}
      </Fragment>
    ))}
  </div>
)

export default Runeword