import { ReactElement } from 'react'
import './CSS/App.css'

import { UniqueItems } from './data/UniqueItems'
import { SetItems } from './data/SetItems'
import { Runewords } from './data/Runewords'

import ItemFinder from './components/ItemFinder'

const App = (): ReactElement => {
  return (
    <div className='App'>
      <ItemFinder
        UniqueItems={UniqueItems}
        SetItems={SetItems}
        Runewords={Runewords}
      />
    </div>
  )
}

export default App
