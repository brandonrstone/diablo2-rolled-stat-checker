import React, { Fragment } from 'react'
import useItemValidation from '../hooks/useItemValidation'
import { UniqueItemType } from '../types'

const UniqueItem: React.FC = (uniqueItem: UniqueItemType): JSX.Element => {
  const { isValidStat } = useItemValidation()

  const itemIsCharm = (itemBase: string) =>
    itemBase === 'Grand Charm' || itemBase === 'Large Charm' || itemBase === 'Small Charm'
      ? true
      : false

  return (
    <div className='unique-item-container'>
      <div className='unique-item-name'>{uniqueItem.name}</div>
      <div className='item-base' style={{ color: itemIsCharm(uniqueItem.itemBase) ? 'rgb(201, 175, 111)' : 'rgb(110, 108, 108)' }}>
        {uniqueItem.itemBase}
      </div>
      <div className='item-requirements'>Required Level: {uniqueItem.requiredLevel}</div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(stat => (
        <Fragment key={stat}>
          {uniqueItem[`min${stat}`] < uniqueItem[`max${stat}`] && (
            <div>
              <div>{isValidStat(uniqueItem[`prop${stat}`]) && <span>{uniqueItem[`prop${stat}`]}</span>}</div>
              <span className='runeword-min-roll'>{uniqueItem[`min${stat}`]}</span> -{' '}
              <span className='runeword-max-roll'>{uniqueItem[`max${stat}`]}</span>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default UniqueItem