import React from 'react'

import useItemValidation from '../hooks/useItemValidation'

const SetItem: React.FC = (props: any): JSX.Element => {
  const { isValidStat } = useItemValidation()

  return (
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
}

export default SetItem