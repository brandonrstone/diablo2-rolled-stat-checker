export type UniqueItemType = {
  name: string
  id: number
  version: number
  enabled?: number
  rarity: number
  level?: number
  requiredLevel?: number
  code?: string
  itemBase?: string
  costMult?: number
  costAdd?: number
  prop1?: string
  min1?: number
  max1?: number
  prop2?: string
  min2?: number
  max2?: number
  prop3?: string
  min3?: number | string
  max3?: number
  prop4?: string
  min4?: number
  max4?: number
  prop5?: string
  par5?: number | string
  min5?: number | string
  max5?: number | string
  prop6?: string
  par6?: number | string
  min6?: number
  max6?: number
  prop7?: string
  par7?: number | string
  min7?: number | string
  max7?: number | string
  prop8?: string
  par8?: number | string
  min8?: number | string
  max8?: number | string
  prop9?: string
  par9?: number | string
  min9?: number | string
  max9?: number | string
  prop10?: string
  par10?: number | string
  min10?: number | string
  max10?: number | string
  expansion?: number
  lineNumber?: number
}

export type SetItemType = {
  name: string
  id: number
  set: string
  item: string
  itemBase: string
  rarity?: number
  lvl?: number
  requiredLevel?: number
  chrtransform?: string
  invtransform?: string
  costMult?: number
  costAdd?: number
  addFunc?: number
  prop1?: string
  par1?: number
  min1?: number
  max1?: number
  prop2?: string
  par2?: number
  min2?: number
  max2?: number
  prop3?: string
  par3?: number
  min3?: number
  max3?: number
  prop4?: string
  par4?: number
  min4?: number
  max4?: number
  prop5?: string
  par5?: string | number
  min5?: number
  max5?: number
  prop6?: string
  par6?: string
  min6?: number
  max6?: number
  prop7?: string
  par7?: string | number
  min7?: number
  max7?: number
  aprop1a?: string
  apar1a?: number
  amin1a?: number
  amax1a?: number
  aprop2a?: string
  apar2a?: string | number
  amin2a?: number
  amax2a?: number
  aprop3a?: string
  apar3a?: number
  amin3a?: number
  amax3a?: number
  aprop4a?: string
  apar4a?: number
  amin4a?: number
  amax4a?: number
  aprop5a?: string
  apar5a?: string | number
  amin5a?: number
  amax5a?: number
  expansion?: number
  lineNumber?: number
}

export type RunewordType = {
  name: string
  id: string
  requiredLevel: number
  complete: number
  server?: number
  patchRelease: number | string
  itype1: string
  itype2?: string
  itype3?: string
  RequiredRunes: string
  Rune1: string
  Rune2: string
  Rune3?: string
  Rune4?: string
  Rune5?: string
  Rune6?: string
  T1Code1: string
  T1Param1?: string | number
  T1Min1?: number
  T1Max1?: number
  T1Code2?: string
  T1Param2?: string | number
  T1Min2?: number
  T1Max2?: number
  T1Code3?: string
  T1Param3?: string | number
  T1Min3?: number
  T1Max3?: number
  T1Code4?: string
  T1Param4?: string | number
  T1Min4?: number
  T1Max4?: number
  T1Code5?: string
  T1Param5?: string | number
  T1Min5?: number
  T1Max5?: number
  T1Code6?: string
  T1Param6?: string | number
  T1Min6?: number
  T1Max6?: number
  T1Code7?: string
  T1Param7?: string | number
  T1Min7?: number
  T1Max7?: number
  lineNumber: number
}