import React, { useMemo, useState } from 'react'

import { Runewords } from '../data/Runewords'
import { UniqueItems } from '../data/UniqueItems'

const Shako = [
  {
    Name: 'Harlequin Crest',
    id: 248,
    version: 100,
    enabled: 1,
    rarity: 1,
    level: 69,
    levelReq: 62,
    code: 'uap',
    itemBase: 'Shako',
    costMult: 3,
    costAdd: 5000,
    chrtransform: 'cgrn',
    invtransform: 'cgrn',
    prop1: 'allskills',
    min1: 2,
    max1: 2,
    prop2: 'hp/level',
    par2: 12,
    prop3: 'mana/level',
    par3: 12,
    prop4: 'mag%',
    min4: 50,
    max4: 50,
    prop5: 'red-dmg%',
    min5: 10,
    max5: 10,
    prop6: 'str',
    min6: 2,
    max6: 2,
    prop7: 'dex',
    min7: 2,
    max7: 2,
    prop8: 'vit',
    min8: 2,
    max8: 2,
    prop9: 'enr',
    min9: 2,
    max9: 2,
    expansion: 1,
    lineNumber: 249
  },
  {
    Name: 'Goops',
    id: 248,
    version: 100,
    enabled: 1,
    rarity: 1,
    level: 69,
    levelReq: 62,
    code: 'uap'
  }
]

export default function ItemFinder() {
  const [search, setSearch] = useState('')

  const Runeword = props => (
    <div>
      {props.T1Code1 && (
        <div className='runeword'>
          <h3>{props.Name}</h3>
          <h4>
            '{props.Rune1}
            {props.Rune2}
            {props.Rune3}
            {props.Rune4}
            {props.Rune5}'
          </h4>
          {props.T1Min1 !== props.T1Max1 && props.T1Min1 < props.T1Max1 && (
            <div>
              {props.T1Code1 !== 'oskill' &&
                props.T1Code1 !== 'hit-skill' &&
                props.T1Code1 !== 'gethit-skill' &&
                props.T1Code1 !== 'charged' && <p>{props.T1Code1}</p>}
              <div>{props.T1Param1 && <p>{props.T1Param1}</p>}</div>
              <span style={{ color: 'red' }}>{props.T1Min1}</span> -{' '}
              <span style={{ color: 'green' }}>{props.T1Max1}</span>
            </div>
          )}
          {props.T1Min2 !== props.T1Max2 && props.T1Min2 < props.T1Max2 && (
            <div>
              {props.T1Code2 !== 'oskill' &&
                props.T1Code2 !== 'hit-skill' &&
                props.T1Code2 !== 'gethit-skill' &&
                props.T1Code2 !== 'charged' && <p>{props.T1Code2}</p>}
              <div>{props.T1Param2 && <p>{props.T1Param2}</p>}</div>
              <span style={{ color: 'red' }}>{props.T1Min2}</span> -{' '}
              <span style={{ color: 'green' }}>{props.T1Max2}</span>
            </div>
          )}
          {props.T1Min3 !== props.T1Max3 && props.T1Min3 < props.T1Max3 && (
            <div>
              {props.T1Code3 !== 'oskill' &&
                props.T1Code3 !== 'gethit-skill' &&
                props.T1Code3 !== 'charged' && <p>{props.T1Code3}</p>}
              <div>{props.T1Param3 && <p>{props.T1Param3}</p>}</div>
              <span style={{ color: 'red' }}>{props.T1Min3}</span> -{' '}
              <span style={{ color: 'green' }}>{props.T1Max3}</span>
            </div>
          )}
          {props.T1Min4 !== props.T1Max4 && props.T1Min4 < props.T1Max4 && (
            <div>
              {props.T1Code4 !== 'oskill' &&
                props.T1Code4 !== 'gethit-skill' &&
                props.T1Code4 !== 'charged' && <p>{props.T1Code4}</p>}
              <div>{props.T1Param4 && <p>{props.T1Param4}</p>}</div>
              <span style={{ color: 'red' }}>{props.T1Min4}</span> -{' '}
              <span style={{ color: 'green' }}>{props.T1Max4}</span>
            </div>
          )}
          {props.T1Min5 !== props.T1Max5 && props.T1Min5 < props.T1Max5 && (
            <div>
              {props.T1Code5 !== 'oskill' &&
                props.T1Code5 !== 'gethit-skill' &&
                props.T1Code5 !== 'charged' && <p>{props.T1Code5}</p>}
              <div>{props.T1Param5 && <p>{props.T1Param5}</p>}</div>
              <span style={{ color: 'red' }}>{props.T1Min5}</span> -{' '}
              <span style={{ color: 'green' }}>{props.T1Max5}</span>
            </div>
          )}
          {props.T1Min6 !== props.T1Max6 && props.T1Min6 < props.T1Max6 && (
            <div>
              {props.T1Code6 !== 'oskill' &&
                props.T1Code6 !== 'aura' &&
                props.T1Code6 !== 'charged' && <p>{props.T1Code6}</p>}
              <div>{props.T1Param6 && <p>{props.T1Param6}</p>}</div>
              <span style={{ color: 'red' }}>{props.T1Min6}</span> -{' '}
              <span style={{ color: 'green' }}>{props.T1Max6}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )

  const UniqueItem = props => (
    <div className='uniqueItem'>
      <h3>{props.Name}</h3>
      <h4>{props.itemBase}</h4>
      {props.min1 !== props.max1 && props.min1 < props.max1 && (
        <div>
          {props.prop1 !== 'oskill' &&
            props.prop1 !== 'hit-skill' &&
            props.prop1 !== 'gethit-skill' &&
            props.prop1 !== 'charged' && <p>{props.prop1}</p>}
          <span style={{ color: 'red' }}>{props.min1}</span> -{' '}
          <span style={{ color: 'green' }}>{props.max1}</span>
        </div>
      )}
      {props.min2 !== props.max2 && props.min2 < props.max2 && (
        <div>
          {props.prop2 !== 'oskill' &&
            props.prop2 !== 'hit-skill' &&
            props.prop2 !== 'gethit-skill' &&
            props.prop2 !== 'charged' && <p>{props.prop2}</p>}
          <span style={{ color: 'red' }}>{props.min2}</span> -{' '}
          <span style={{ color: 'green' }}>{props.max2}</span>
        </div>
      )}
      {props.min3 !== props.max3 && props.min3 < props.max3 && (
        <div>
          {props.prop3 !== 'oskill' &&
            props.prop3 !== 'hit-skill' &&
            props.prop3 !== 'gethit-skill' &&
            props.prop3 !== 'charged' && <p>{props.prop3}</p>}
          <span style={{ color: 'red' }}>{props.min3}</span> -{' '}
          <span style={{ color: 'green' }}>{props.max3}</span>
        </div>
      )}
      {props.min4 !== props.max4 && props.min4 < props.max4 && (
        <div>
          {props.prop4 !== 'oskill' &&
            props.prop4 !== 'hit-skill' &&
            props.prop4 !== 'gethit-skill' &&
            props.prop4 !== 'charged' && <p>{props.prop4}</p>}
          <span style={{ color: 'red' }}>{props.min4}</span> -{' '}
          <span style={{ color: 'green' }}>{props.max4}</span>
        </div>
      )}
      {props.min5 !== props.max5 && props.min5 < props.max5 && (
        <div>
          {props.prop5 !== 'oskill' &&
            props.prop5 !== 'hit-skill' &&
            props.prop5 !== 'gethit-skill' &&
            props.prop5 !== 'charged' && <p>{props.prop5}</p>}
          <span style={{ color: 'red' }}>{props.min5}</span> -{' '}
          <span style={{ color: 'green' }}>{props.max5}</span>
        </div>
      )}
      {props.min6 !== props.max6 && props.min6 < props.max6 && (
        <div>
          {props.prop6 !== 'oskill' &&
            props.prop6 !== 'hit-skill' &&
            props.prop6 !== 'gethit-skill' &&
            props.prop6 !== 'charged' && <p>{props.prop6}</p>}
          <span style={{ color: 'red' }}>{props.min6}</span> -{' '}
          <span style={{ color: 'green' }}>{props.max6}</span>
        </div>
      )}
      {props.min7 !== props.max7 && props.min7 < props.max7 && (
        <div>
          {props.prop7 !== 'oskill' &&
            props.prop7 !== 'hit-skill' &&
            props.prop7 !== 'gethit-skill' &&
            props.prop7 !== 'charged' && <p>{props.prop7}</p>}
          <span style={{ color: 'red' }}>{props.min7}</span> -{' '}
          <span style={{ color: 'green' }}>{props.max7}</span>
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
        type='search'
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
