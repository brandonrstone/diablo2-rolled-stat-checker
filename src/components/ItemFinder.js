import React, { useMemo, useState } from 'react'

import { Runewords } from '../data/Runewords'
import { UniqueItems } from '../data/UniqueItems'

export default function ItemFinder() {
  const [search, setSearch] = useState('')

  const Runeword = props => (
    <div className='runeword-container'>
      {props.T1Code1 && (
        <div>
          <div className='runeword-name'>{props.Name}</div>
          <div className='runeword-type'>{props.itype1}</div>
          <div className='runeword-runes'>
            '{props.Rune1}
            {props.Rune2}
            {props.Rune3}
            {props.Rune4}
            {props.Rune5}'
          </div>
          {props.T1Min1 !== props.T1Max1 && props.T1Min1 < props.T1Max1 && (
            <div>
              {props.T1Code1 !== 'oskill' &&
                props.T1Code1 !== 'hit-skill' &&
                props.T1Code1 !== 'gethit-skill' &&
                props.T1Code1 !== 'charged' && <span>{props.T1Code1}</span>}
              <div>{props.T1Param1 && <span>{props.T1Param1}</span>}</div>
              <span className='runeword-min-roll'>{props.T1Min1}</span> -{' '}
              <span className='runeword-max-roll'>{props.T1Max1}</span>
            </div>
          )}
          {props.T1Min2 !== props.T1Max2 && props.T1Min2 < props.T1Max2 && (
            <div>
              {props.T1Code2 !== 'oskill' &&
                props.T1Code2 !== 'hit-skill' &&
                props.T1Code2 !== 'gethit-skill' &&
                props.T1Code2 !== 'charged' && <span>{props.T1Code2}</span>}
              <div>{props.T1Param2 && <span>{props.T1Param2}</span>}</div>
              <span className='runeword-min-roll'>{props.T1Min2}</span> -{' '}
              <span className='runeword-max-roll'>{props.T1Max2}</span>
            </div>
          )}
          {props.T1Min3 !== props.T1Max3 && props.T1Min3 < props.T1Max3 && (
            <div>
              {props.T1Code3 !== 'oskill' &&
                props.T1Code3 !== 'hit-skill' &&
                props.T1Code3 !== 'gethit-skill' &&
                props.T1Code3 !== 'charged' && <span>{props.T1Code3}</span>}
              <div>{props.T1Param3 && <span>{props.T1Param3}</span>}</div>
              <span className='runeword-min-roll'>{props.T1Min3}</span> -{' '}
              <span className='runeword-max-roll'>{props.T1Max3}</span>
            </div>
          )}
          {props.T1Min4 !== props.T1Max4 && props.T1Min4 < props.T1Max4 && (
            <div>
              {props.T1Code4 !== 'oskill' &&
                props.T1Code4 !== 'gethit-skill' &&
                props.T1Code4 !== 'charged' && <span>{props.T1Code4}</span>}
              <div>{props.T1Param4 && <span>{props.T1Param4}</span>}</div>
              <span className='runeword-min-roll'>{props.T1Min4}</span> -{' '}
              <span className='runeword-max-roll'>{props.T1Max4}</span>
            </div>
          )}
          {props.T1Min5 !== props.T1Max5 && props.T1Min5 < props.T1Max5 && (
            <div>
              {props.T1Code5 !== 'oskill' &&
                props.T1Code5 !== 'gethit-skill' &&
                props.T1Code5 !== 'charged' && <span>{props.T1Code5}</span>}
              <div>{props.T1Param5 && <span>{props.T1Param5}</span>}</div>
              <span className='runeword-min-roll'>{props.T1Min5}</span> -{' '}
              <span className='runeword-max-roll'>{props.T1Max5}</span>
            </div>
          )}
          {props.T1Min6 !== props.T1Max6 && props.T1Min6 < props.T1Max6 && (
            <div>
              {props.T1Code6 !== 'oskill' &&
                props.T1Code6 !== 'aura' &&
                props.T1Code6 !== 'charged' && <span>{props.T1Code6}</span>}
              <div>{props.T1Param6 && <span>{props.T1Param6}</span>}</div>
              <span className='runeword-min-roll'>{props.T1Min6}</span> -{' '}
              <span className='runeword-max-roll'>{props.T1Max6}</span>
            </div>
          )}
          {props.T1Min7 !== props.T1Max7 && props.T1Min7 < props.T1Max7 && (
            <div>
              {props.T1Code7 !== 'oskill' &&
                props.T1Code7 !== 'aura' &&
                props.T1Code7 !== 'charged' && <span>{props.T1Code7}</span>}
              <div>{props.T1Param6 && <span>{props.T1Param7}</span>}</div>
              <span className='runeword-min-roll'>{props.T1Min7}</span> -{' '}
              <span className='runeword-max-roll'>{props.T1Max7}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )

  const UniqueItem = props => (
    <div className='unique-item-container'>
      <div className='unique-item-name'>{props.Name}</div>
      <div className='unique-item-base'>{props.itemBase}</div>
      {props.min1 !== props.max1 && props.min1 < props.max1 && (
        <div>
          {props.prop1 !== 'oskill' &&
            props.prop1 !== 'hit-skill' &&
            props.prop1 !== 'gethit-skill' &&
            props.prop1 !== 'charged' && <span>{props.prop1}</span>}
          <div></div>
          <span className='unique-item-min-roll'>{props.min1}</span> -{' '}
          <span className='unique-item-max-roll'>{props.max1}</span>
        </div>
      )}
      {props.min2 !== props.max2 && props.min2 < props.max2 && (
        <div>
          {props.prop2 !== 'oskill' &&
            props.prop2 !== 'hit-skill' &&
            props.prop2 !== 'gethit-skill' &&
            props.prop2 !== 'charged' && <span>{props.prop2}</span>}
          <div></div>
          <span className='unique-item-min-roll'>{props.min2}</span> -{' '}
          <span className='unique-item-max-roll'>{props.max2}</span>
        </div>
      )}
      {props.min3 !== props.max3 && props.min3 < props.max3 && (
        <div>
          {props.prop3 !== 'oskill' &&
            props.prop3 !== 'hit-skill' &&
            props.prop3 !== 'gethit-skill' &&
            props.prop3 !== 'charged' && <span>{props.prop3}</span>}
          <div></div>
          <span className='unique-item-min-roll'>{props.min3}</span> -{' '}
          <span className='unique-item-max-roll'>{props.max3}</span>
        </div>
      )}
      {props.min4 !== props.max4 && props.min4 < props.max4 && (
        <div>
          {props.prop4 !== 'oskill' &&
            props.prop4 !== 'hit-skill' &&
            props.prop4 !== 'gethit-skill' &&
            props.prop4 !== 'charged' && <span>{props.prop4}</span>}
          <div></div>
          <span className='unique-item-min-roll'>{props.min4}</span> -{' '}
          <span className='unique-item-max-roll'>{props.max4}</span>
        </div>
      )}
      {props.min5 !== props.max5 && props.min5 < props.max5 && (
        <div>
          {props.prop5 !== 'oskill' &&
            props.prop5 !== 'hit-skill' &&
            props.prop5 !== 'gethit-skill' &&
            props.prop5 !== 'charged' && <span>{props.prop5}</span>}
          <div></div>
          <span className='unique-item-min-roll'>{props.min5}</span> -{' '}
          <span className='unique-item-max-roll'>{props.max5}</span>
        </div>
      )}
      {props.min6 !== props.max6 && props.min6 < props.max6 && (
        <div>
          {props.prop6 !== 'oskill' &&
            props.prop6 !== 'hit-skill' &&
            props.prop6 !== 'gethit-skill' &&
            props.prop6 !== 'charged' && <span>{props.prop6}</span>}
          <div></div>
          <span className='unique-item-min-roll'>{props.min6}</span> -{' '}
          <span className='unique-item-max-roll'>{props.max6}</span>
        </div>
      )}
      {props.min7 !== props.max7 && props.min7 < props.max7 && (
        <div>
          {props.prop7 !== 'oskill' &&
            props.prop7 !== 'hit-skill' &&
            props.prop7 !== 'gethit-skill' &&
            props.prop7 !== 'charged' && <span>{props.prop7}</span>}
          <div></div>
          <span className='unique-item-min-roll'>{props.min7}</span> -{' '}
          <span className='unique-item-max-roll'>{props.max7}</span>
        </div>
      )}
    </div>
  )

  const filteredRunewords = Runewords.filter(runeword =>
    runeword.Name.toLowerCase().includes(search.toLowerCase())
  )

  const filteredUniqueItemsByName = UniqueItems.filter(uniqueItem =>
    uniqueItem.Name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='itemfinder-container'>
      <input
        className='item-search'
        type='search'
        placeholder='Search item...'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {search === ''
        ? null
        : filteredRunewords.map(runeword => {
            return <Runeword key={runeword.id} {...runeword} />
          })}
      {search === ''
        ? null
        : filteredUniqueItemsByName.map(uniqueItem => {
            return <UniqueItem key={uniqueItem.id} {...uniqueItem} />
          })}
    </div>
  )
}
