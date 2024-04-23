interface ItemValidationInterface {
  isValidStat: (props: string) => boolean
}

const useItemValidation = (): ItemValidationInterface => {
  const isValidStat = (props: string) => !['oskill', 'hit-skill', 'gethit-skill', 'charged'].includes(props)

  return { isValidStat }
}

export default useItemValidation