import React, { Fragment } from 'react'

import useItemValidation from '../hooks/useItemValidation'
import type { SetItemType } from '../types'

const SetItem: React.FC = (setItem: SetItemType): JSX.Element => {
  const { isValidStat } = useItemValidation()

  return (
    <div className='set-item-container'>
      <div className='set-item-name'>{setItem.name}</div>
      <div className='item-base'>{setItem.itemBase}</div>
      <div className='item-requirements'>
        Required Level: {setItem.requiredLevel}
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(stat => (
        <Fragment key={stat}>
          {setItem[`min${stat}`] < setItem[`max${stat}`] && (
            <div>
              <div>{isValidStat(setItem[`prop${stat}`]) && <span>{setItem[`prop${stat}`]}</span>}</div>
              <span className='runeword-min-roll'>{setItem[`min${stat}`]}</span> -{' '}
              <span className='runeword-max-roll'>{setItem[`max${stat}`]}</span>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default SetItem