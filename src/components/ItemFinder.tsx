import React, { useState, useMemo, ReactElement } from 'react'

import { Runeword, SetItem, UniqueItem } from '../itemsModel'

interface ItemFinderProps {
  UniqueItems: UniqueItem[]
  SetItems: SetItem[]
  Runewords: Runeword[]
}

const ItemFinder = ({ UniqueItems, SetItems, Runewords }: ItemFinderProps): ReactElement => {
  const [search, setSearch] = useState<any>('')

  const itemIsCharm = (props: any) => {
    return !['Small Charm', 'Large Charm', 'Grand Charm'].includes(props.name)
  }

  const isValidStat = (props: string) => {
    return !['oskill', 'hit-skill', 'gethit-skill', 'charged'].includes(props)
  }

  const isValidRunewordStat = (props: string) => {
    return !['oskill', 'aura', 'charged'].includes(props)
  }

  const UniqueItem = (props: any): JSX.Element => {
    return (
      <div className='unique-item-container'>
        <div className='unique-item-name'>{props.name}</div>
        <div
          className='item-base'
          style={
            itemIsCharm(props.name)
              ? { color: 'rgb(201, 175, 111)' }
              : { color: 'rgb(110, 108, 108)' }
          }
        >
          {props.itemBase}
        </div>
        <div className='item-requirements'>
          Required Level: {props.requiredLevel}
        </div>
        {props.min1 !== props.max1 && props.min1 < props.max1 && (
          <div>
            {isValidStat(props.prop1) && <span>{props.prop1}</span>}
            <div></div>
            <span className='unique-item-min-roll'>{props.min1}</span> -{' '}
            <span className='unique-item-max-roll'>{props.max1}</span>
          </div>
        )}
        {props.min2 !== props.max2 && props.min2 < props.max2 && (
          <div>
            {isValidStat(props.prop2) && <span>{props.prop2}</span>}
            <div></div>
            <span className='unique-item-min-roll'>{props.min2}</span> -{' '}
            <span className='unique-item-max-roll'>{props.max2}</span>
          </div>
        )}
        {props.min3 !== props.max3 && props.min3 < props.max3 && (
          <div>
            {isValidStat(props.prop3) && <span>{props.prop3}</span>}
            <div></div>
            <span className='unique-item-min-roll'>{props.min3}</span> -{' '}
            <span className='unique-item-max-roll'>{props.max3}</span>
          </div>
        )}
        {props.min4 !== props.max4 && props.min4 < props.max4 && (
          <div>
            {isValidStat(props.prop4) && <span>{props.prop4}</span>}
            <div></div>
            <span className='unique-item-min-roll'>{props.min4}</span> -{' '}
            <span className='unique-item-max-roll'>{props.max4}</span>
          </div>
        )}
        {props.min5 !== props.max5 && props.min5 < props.max5 && (
          <div>
            {isValidStat(props.prop5) && <span>{props.prop5}</span>}
            <div></div>
            <span className='unique-item-min-roll'>{props.min5}</span> -{' '}
            <span className='unique-item-max-roll'>{props.max5}</span>
          </div>
        )}
        {props.min6 !== props.max6 && props.min6 < props.max6 && (
          <div>
            {isValidStat(props.prop6) && <span>{props.prop6}</span>}
            <div></div>
            <span className='unique-item-min-roll'>{props.min6}</span> -{' '}
            <span className='unique-item-max-roll'>{props.max6}</span>
          </div>
        )}
        {props.min7 !== props.max7 && props.min7 < props.max7 && (
          <div>
            {isValidStat(props.prop7) && <span>{props.prop7}</span>}
            <div></div>
            <span className='unique-item-min-roll'>{props.min7}</span> -{' '}
            <span className='unique-item-max-roll'>{props.max7}</span>
          </div>
        )}
        {props.min8 !== props.max8 && props.min8 < props.max8 && (
          <div>
            {isValidStat(props.prop8) && <span>{props.prop8}</span>}
            <div></div>
            <span className='unique-item-min-roll'>{props.min8}</span> -{' '}
            <span className='unique-item-max-roll'>{props.max8}</span>
          </div>
        )}
        {props.min9 !== props.max9 && props.min9 < props.max9 && (
          <div>
            {isValidStat(props.prop9) && <span>{props.prop9}</span>}
            <div></div>
            <span className='unique-item-min-roll'>{props.min9}</span> -{' '}
            <span className='unique-item-max-roll'>{props.max9}</span>
          </div>
        )}
      </div>
    )
  }

  const SetItem = (props: any): JSX.Element => (
    <div className='set-item-container'>
      <div className='set-item-name'>{props.name}</div>
      <div className='item-base'>{props.itemBase}</div>
      <div className='item-requirements'>
        Required Level: {props.requiredLevel}
      </div>
      {props.min1 !== props.max1 && props.min1 < props.max1 && (
        <div>
          {isValidStat(props.prop1) && <span>{props.prop1}</span>}
          <div></div>
          <span className='set-item-min-roll'>{props.min1}</span> -{' '}
          <span className='set-item-max-roll'>{props.max1}</span>
        </div>
      )}
      {props.min2 !== props.max2 && props.min2 < props.max2 && (
        <div>
          {isValidStat(props.prop2) && <span>{props.prop2}</span>}
          <div></div>
          <span className='set-item-min-roll'>{props.min2}</span> -{' '}
          <span className='set-item-max-roll'>{props.max2}</span>
        </div>
      )}
      {props.min3 !== props.max3 && props.min3 < props.max3 && (
        <div>
          {isValidStat(props.prop3) && <span>{props.prop3}</span>}
          <div></div>
          <span className='set-item-min-roll'>{props.min3}</span> -{' '}
          <span className='set-item-max-roll'>{props.max3}</span>
        </div>
      )}
      {props.min4 !== props.max4 && props.min4 < props.max4 && (
        <div>
          {isValidStat(props.prop4) && <span>{props.prop4}</span>}
          <div></div>
          <span className='set-item-min-roll'>{props.min4}</span> -{' '}
          <span className='set-item-max-roll'>{props.max4}</span>
        </div>
      )}
      {props.min5 !== props.max5 && props.min5 < props.max5 && (
        <div>
          {isValidStat(props.prop5) && <span>{props.prop5}</span>}
          <div></div>
          <span className='set-item-min-roll'>{props.min5}</span> -{' '}
          <span className='set-item-max-roll'>{props.max5}</span>
        </div>
      )}
      {props.min6 !== props.max6 && props.min6 < props.max6 && (
        <div>
          {isValidStat(props.prop6) && <span>{props.prop6}</span>}
          <div></div>
          <span className='set-item-min-roll'>{props.min6}</span> -{' '}
          <span className='set-item-max-roll'>{props.max6}</span>
        </div>
      )}
      {props.min7 !== props.max7 && props.min7 < props.max7 && (
        <div>
          {isValidStat(props.prop7) && <span>{props.prop7}</span>}
          <div></div>
          <span className='set-item-min-roll'>{props.min7}</span> -{' '}
          <span className='set-item-max-roll'>{props.max7}</span>
        </div>
      )}
    </div>
  )

  const Runeword = (props: any): JSX.Element => (
    <div className='runeword-container'>
      {props.T1Code1 && props.T1Code2 && (
        <div>
          <div className='runeword-name'>{props.name}</div>
          <div className='item-base'>{props.itype1}</div>
          <div className='runeword-runes'>
            '{props.Rune1}{props.Rune2}{props.Rune3}{props.Rune4}{props.Rune5}'
          </div>
          <div className='item-requirements'>
            Required Level: {props.requiredLevel}
          </div>
          {props.T1Min1 !== props.T1Max1 && props.T1Min1 < props.T1Max1 && (
            <div>
              {isValidRunewordStat(props.T1Code1) && (
                <span>{props.T1Code1}</span>
              )}
              <div>{props.T1Param1 && <span>{props.T1Param1}</span>}</div>
              <span className='runeword-min-roll'>{props.T1Min1}</span> -{' '}
              <span className='runeword-max-roll'>{props.T1Max1}</span>
            </div>
          )}
          {props.T1Min2 !== props.T1Max2 && props.T1Min2 < props.T1Max2 && (
            <div>
              {isValidRunewordStat(props.T1Code2) && (
                <span>{props.T1Code2}</span>
              )}
              <div>{props.T1Param2 && <span>{props.T1Param2}</span>}</div>
              <span className='runeword-min-roll'>{props.T1Min2}</span> -{' '}
              <span className='runeword-max-roll'>{props.T1Max2}</span>
            </div>
          )}
          {props.T1Min3 !== props.T1Max3 && props.T1Min3 < props.T1Max3 && (
            <div>
              {isValidRunewordStat(props.T1Code3) && (
                <span>{props.T1Code3}</span>
              )}
              <div>{props.T1Param3 && <span>{props.T1Param3}</span>}</div>
              <span className='runeword-min-roll'>{props.T1Min3}</span> -{' '}
              <span className='runeword-max-roll'>{props.T1Max3}</span>
            </div>
          )}
          {props.T1Min4 !== props.T1Max4 && props.T1Min4 < props.T1Max4 && (
            <div>
              {isValidRunewordStat(props.T1Code4) && (
                <span>{props.T1Code4}</span>
              )}
              <div>{props.T1Param4 && <span>{props.T1Param4}</span>}</div>
              <span className='runeword-min-roll'>{props.T1Min4}</span> -{' '}
              <span className='runeword-max-roll'>{props.T1Max4}</span>
            </div>
          )}
          {props.T1Min5 !== props.T1Max5 && props.T1Min5 < props.T1Max5 && (
            <div>
              {isValidRunewordStat(props.T1Code5) && (
                <span>{props.T1Code5}</span>
              )}
              <div>{props.T1Param5 && <span>{props.T1Param5}</span>}</div>
              <span className='runeword-min-roll'>{props.T1Min5}</span> -{' '}
              <span className='runeword-max-roll'>{props.T1Max5}</span>
            </div>
          )}
          {props.T1Min6 !== props.T1Max6 && props.T1Min6 < props.T1Max6 && (
            <div>
              {isValidRunewordStat(props.T1Code6) && (
                <span>{props.T1Code6}</span>
              )}
              <div>{props.T1Param6 && <span>{props.T1Param6}</span>}</div>
              <span className='runeword-min-roll'>{props.T1Min6}</span> -{' '}
              <span className='runeword-max-roll'>{props.T1Max6}</span>
            </div>
          )}
          {props.T1Min7 !== props.T1Max7 && props.T1Min7 < props.T1Max7 && (
            <div>
              {isValidRunewordStat(props.T1Code7) && (
                <span>{props.T1Code7}</span>
              )}
              <div>{props.T1Param6 && <span>{props.T1Param7}</span>}</div>
              <span className='runeword-min-roll'>{props.T1Min7}</span> -{' '}
              <span className='runeword-max-roll'>{props.T1Max7}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )

  const filteredUniqueItems = useMemo(() =>
    UniqueItems.filter((uniqueItem: any) => uniqueItem.name.toLowerCase().includes(search.toLowerCase())),
    [search, UniqueItems]
  )
  const filteredSetItems = useMemo(() =>
    SetItems.filter((setItem: any) => setItem.name.toLowerCase().includes(search.toLowerCase())),
    [search, SetItems]
  )
  const filteredRunewords = useMemo(() =>
    Runewords.filter((runeword: any) => runeword.name.toLowerCase().includes(search.toLowerCase())),
    [search, Runewords]
  )

  return (
    <div className='itemfinder-container'>
      <div className='searchbar-container'>
        <img
          className='diablo-2-logo'
          src={require('../images/Diablo_II_Logo.webp')}
          alt='Diablo_II_Logo'
        />
        <span className='app-name-text'>Rolled Stat Checker v1.0</span>
        <input
          className='item-search'
          type='search'
          placeholder='Search item...'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className='itemlist-container'>
        {search === ''
          ? null
          : filteredUniqueItems.map((uniqueItem: UniqueItem) => {
            return <UniqueItem key={uniqueItem.id} {...uniqueItem} />
          })}
        {search === ''
          ? null
          : filteredSetItems.map((setItem: SetItem) => {
            return <SetItem key={setItem.id} {...setItem} />
          })}
        {search === ''
          ? null
          : filteredRunewords.map((runeword: Runeword) => {
            return <Runeword key={runeword.id} {...runeword} />
          })}
      </div>
    </div>
  )
}

export default ItemFinder
