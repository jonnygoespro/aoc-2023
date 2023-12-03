export const directions: Direction[] = [
  {
    x: 1,
    y: 0
  },
  {
    x: 0,
    y: 1
  },
  {
    x: -1,
    y: 0
  },
  {
    x: 0,
    y: -1
  }
]

export const directionsWithDiagonals: Direction[] = [
  {
    x: 1,
    y: 0
  },
  {
    x: 1,
    y: 1
  },
  {
    x: 0,
    y: 1
  },
  {
    x: -1,
    y: 1
  },
  {
    x: -1,
    y: 0
  },
  {
    x: -1,
    y: -1
  },
  {
    x: 0,
    y: -1
  },
  {
    x: 1,
    y: -1
  }
]

interface Direction {
  x: number
  y: number
}
