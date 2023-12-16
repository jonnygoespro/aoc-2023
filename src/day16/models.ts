export interface Node {
  x: number
  y: number
  previous: {
    x: number
    y: number
  }
}

export interface VisitedDirections {
  fromLeft: boolean
  fromRight: boolean
  fromTop: boolean
  fromBottom: boolean
}
