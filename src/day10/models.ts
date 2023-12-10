export type Direction = 'north' | 'south' | 'east' | 'west'

export const mapping: any = {
  '|': {
    north: -1,
    east: 0,
    south: 1,
    west: 0
  },
  '-': {
    north: 0,
    east: 1,
    south: 0,
    west: -1
  },
  7: {
    north: 0,
    east: 0,
    south: 1,
    west: -1
  },
  F: {
    north: 0,
    east: 1,
    south: 1,
    west: 0
  },
  J: {
    north: -1,
    east: 0,
    south: 0,
    west: -1
  },
  L: {
    north: -1,
    east: 1,
    south: 0,
    west: 0
  }
}
