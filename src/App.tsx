import { ReactElement, useMemo, useState } from 'react'
import './index.css'

import { UniqueItems } from './data/UniqueItems'
import { SetItems } from './data/SetItems'
import { Runewords } from './data/Runewords'
import type { RunewordType, SetItemType, UniqueItemType } from './types'

import UniqueItem from './components/UniqueItem'
import SetItem from './components/SetItem'
import Runeword from './components/Runeword'

const App = (): ReactElement => {
  const [search, setSearch] = useState('')

  const filteredUniqueItems = useMemo(() => {
    return UniqueItems.filter((uniqueItem: UniqueItemType) => uniqueItem.name.toLowerCase().includes(search.toLowerCase()))
  }, [search])

  const filteredSetItems = useMemo(() => {
    return SetItems.filter((setItem: SetItemType) => setItem.name.toLowerCase().includes(search.toLowerCase()))
  }, [search])

  const filteredRunewords = useMemo(() => {
    return Runewords.filter((runeword: RunewordType) => runeword?.name?.toLowerCase().includes(search.toLowerCase()))
  }, [search])

  return (
    <div className='itemfinder-container'>
      <div className='searchbar-container'>
        <img className='diablo-2-logo' src={require('./images/Diablo_II_Logo.webp')} alt='Diablo_II_Logo' />
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
          : filteredUniqueItems.map((uniqueItem: UniqueItemType) => (
            <UniqueItem key={uniqueItem.id} {...uniqueItem} />
          ))}
        {search === ''
          ? null
          : filteredSetItems.map((setItem: SetItemType) => (
            <SetItem key={setItem.id} {...setItem} />
          ))}
        {search === ''
          ? null
          : filteredRunewords.map((runeword: RunewordType) => (
            <Runeword key={runeword.id} {...runeword} />
          ))}
      </div>
    </div>
  )
}

export default App