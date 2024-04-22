import React from 'react'
import useItemValidation from '../hooks/useItemValidation'

const UniqueItem: React.FC = (props: any): JSX.Element => {
  const { isValidStat, itemIsCharm } = useItemValidation()

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

export default UniqueItem