import React, { useMemo, useState } from 'react'

import { Runewords } from '../data/Runewords'

const exile = {
  id: 'Runeword37',
  Name: 'Exile',
  complete: 1,
  '*Patch Release': 110,
  itype1: 'pala',
  RequiredRunes: 'VexOhmIstDol',
  Rune1: 'r26',
  Rune2: 'r27',
  Rune3: 'r24',
  Rune4: 'r14',
  T1Code1: 'block2',
  T1Min1: 30,
  T1Max1: 30,
  T1Code2: 'freeze',
  T1Min2: 1,
  T1Max2: 1,
  T1Code3: 'ac%',
  T1Min3: 220,
  T1Max3: 260,
  T1Code4: 'aura',
  T1Param4: 'Defiance',
  T1Min4: 13,
  T1Max4: 16,
  T1Code5: 'skilltab',
  T1Param5: 10,
  T1Min5: 2,
  T1Max5: 2,
  T1Code6: 'hit-skill',
  T1Param6: 'Life Tap',
  T1Min6: 15,
  T1Max6: 5,
  T1Code7: 'rep-dur',
  T1Param7: 25,
  lineNumber: 36
}

export default function ItemFinder() {
  const [search, setSearch] = useState('')

  const Runeword = props => (
    <div>
      {props.T1Code1 && (
        <div className='runeword'>
          <h3>{props.Name}</h3>
          {props.T1Min1 !== props.T1Max1 && props.T1Min1 < props.T1Max1 && (
            <div>
              <div>{<p>{props.T1Code1}</p>}</div>
              <div>{props.T1Param1 && <p>{props.T1Param1}</p>}</div>
              <span style={{ color: 'red' }}>{props.T1Min1}</span> -{' '}
              <span style={{ color: 'green' }}>{props.T1Max1}</span>
            </div>
          )}
          {props.T1Min2 !== props.T1Max2 && props.T1Min2 < props.T1Max2 && (
            <div>
              <div>{<p>{props.T1Code2}</p>}</div>
              <div>{props.T1Param2 && <p>{props.T1Param2}</p>}</div>
              <span style={{ color: 'red' }}>{props.T1Min2}</span> -{' '}
              <span style={{ color: 'green' }}>{props.T1Max2}</span>
            </div>
          )}
          {props.T1Min3 !== props.T1Max3 && props.T1Min3 < props.T1Max3 && (
            <div>
              {props.T1Code3 !== 'oskill' && <p>{props.T1Code3}</p>}
              <div>{props.T1Param3 && <p>{props.T1Param3}</p>}</div>
              <span style={{ color: 'red' }}>{props.T1Min3}</span> -{' '}
              <span style={{ color: 'green' }}>{props.T1Max3}</span>
            </div>
          )}
          {props.T1Min4 !== props.T1Max4 && props.T1Min4 < props.T1Max4 && (
            <div>
              {props.T1Code4 !== 'oskill' && <p>{props.T1Code4}</p>}
              <div>{props.T1Param4 && <p>{props.T1Param4}</p>}</div>
              <span style={{ color: 'red' }}>{props.T1Min4}</span> -{' '}
              <span style={{ color: 'green' }}>{props.T1Max4}</span>
            </div>
          )}
          {props.T1Min5 !== props.T1Max5 && props.T1Min5 < props.T1Max5 && (
            <div>
              {props.T1Code5 !== 'oskill' && <p>{props.T1Code5}</p>}
              <div>{props.T1Param5 && <p>{props.T1Param5}</p>}</div>
              <span style={{ color: 'red' }}>{props.T1Min5}</span> -{' '}
              <span style={{ color: 'green' }}>{props.T1Max5}</span>
            </div>
          )}
          {props.T1Min6 !== props.T1Max6 && props.T1Min6 < props.T1Max6 && (
            <div>
              {props.T1Code6 !== 'oskill' && props.T1Code6 !== 'aura' && (
                <p>{props.T1Code6}</p>
              )}
              <div>{props.T1Param6 && <p>{props.T1Param6}</p>}</div>
              <span style={{ color: 'red' }}>{props.T1Min6}</span> -{' '}
              <span style={{ color: 'green' }}>{props.T1Max6}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )

  const filteredRunewords = Runewords.filter(runeword =>
    runeword.Name.toLowerCase().includes(search.toLowerCase())
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
    </div>
  )
}
