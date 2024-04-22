interface ItemValidationInterface {
  itemIsCharm: (props: any) => boolean
  isValidStat: (props: string) => boolean
  isValidRunewordStat: (props: string) => boolean
}

const useItemValidation = (): ItemValidationInterface => {

  const itemIsCharm = (props: any) => !['Small Charm', 'Large Charm', 'Grand Charm'].includes(props?.name)

  const isValidStat = (props: string) => !['oskill', 'hit-skill', 'gethit-skill', 'charged'].includes(props)

  const isValidRunewordStat = (props: string) => !['oskill', 'aura', 'charged'].includes(props)

  return { itemIsCharm, isValidStat, isValidRunewordStat }
}

export default useItemValidation