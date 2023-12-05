export interface Range {
  from: number
  to: number
  mapping: number
}

export interface Map {
  ranges: Range[]
}

export interface Almanac {
  maps: Map[]
}
