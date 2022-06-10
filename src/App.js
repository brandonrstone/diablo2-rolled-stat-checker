import React from 'react'
import './CSS/App.css'

import ItemFinder from './components/ItemFinder'
import { UniqueItems } from './data/UniqueItems'
import { Runewords } from './data/Runewords'

export default function App() {
  return (
    <div className='App'>
      <ItemFinder UniqueItems={UniqueItems} Runewords={Runewords} />
    </div>
  )
}
