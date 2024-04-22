import useItemValidation from '../hooks/useItemValidation'

const Runeword = (props: any): JSX.Element => {
  const { isValidRunewordStat } = useItemValidation()

  return (
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
}

export default Runeword