import { useState, useMemo, ReactElement } from 'react'
import type { RunewordType, SetItemType, UniqueItemType } from '../types'

import UniqueItem from '../components/UniqueItem'
import Runeword from '../components/Runeword'
import SetItem from '../components/SetItem'

interface ItemFinderProps {
  UniqueItems: UniqueItemType[]
  SetItems: SetItemType[]
  Runewords: RunewordType[]
}

const ItemFinder = ({ UniqueItems, SetItems, Runewords }: ItemFinderProps): ReactElement => {
  const [search, setSearch] = useState('')

  const filteredUniqueItems = useMemo(() => {
    return UniqueItems.filter((uniqueItem: UniqueItemType) => uniqueItem.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, UniqueItems])

  const filteredSetItems = useMemo(() => {
    return SetItems.filter((setItem: SetItemType) => setItem.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, SetItems])

  const filteredRunewords = useMemo(() => {
    return Runewords.filter((runeword: RunewordType) => runeword?.name?.toLowerCase().includes(search.toLowerCase()))
  }, [search, Runewords])

  return (
    <div className='itemfinder-container'>
      <div className='searchbar-container'>
        <img
          className='diablo-2-logo'
          src={require('../images/Diablo_II_Logo.webp')}
          alt='Diablo_II_Logo'
        />
        <span className='app-name-text'>Rolled Stat Checker v1.1</span>
        <input
          className='item-search'
          type='text'
          placeholder='Search item...'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className='itemlist-container'>
        {search === ''
          ? null
          : filteredUniqueItems.map((uniqueItem: UniqueItemType) => {
            return <UniqueItem key={uniqueItem.id} {...uniqueItem} />
          })}
        {search === ''
          ? null
          : filteredSetItems.map((setItem: SetItemType) => {
            return <SetItem key={setItem.id} {...setItem} />
          })}
        {search === ''
          ? null
          : filteredRunewords.map((runeword: RunewordType) => {
            return <Runeword key={runeword.id} {...runeword} />
          })}
      </div>
    </div>
  )
}

export default ItemFinder
