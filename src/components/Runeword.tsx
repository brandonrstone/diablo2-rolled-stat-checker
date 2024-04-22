import { RunewordType } from '../types'

const Runeword = (runeward: RunewordType): JSX.Element => (
  <div className='runeword-container'>
    <div className='runeword-name'>{runeward.name}</div>
    <div className='item-base'>{runeward.itype1}</div>
    <div className='runeword-runes'>
      '{runeward.Rune1}{runeward.Rune2}{runeward.Rune3}{runeward.Rune4}{runeward.Rune5}'
    </div>
    <div className='item-requirements'>Required Level: {runeward.requiredLevel}</div>
    {[1, 2, 3, 4, 5, 6, 7].map((stat: number) => (
      <>
        {runeward[`Stat${stat}Min`] < runeward[`Stat${stat}Max`] && (
          <div>
            <div>{runeward[`Stat${stat}`] && <span>{runeward[`Stat${stat}`]}</span>}</div>
            <span className='runeword-min-roll'>{runeward[`Stat${stat}Min`]}</span> -{' '}
            <span className='runeword-max-roll'>{runeward[`Stat${stat}Max`]}</span>
          </div>
        )}
      </>
    ))}
  </div>
)


export default Runeword