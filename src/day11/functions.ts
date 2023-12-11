import { create2dArray, neighborExists } from '../helpers/array'
import { directions } from '../helpers/directions'

const emptyMarker = 'x'

export const parseAndExpandInput = (input: string): string[][] => {
  const array = create2dArray(input)

  // expand rows
  const expandedRowArray: string[][] = []
  for (let i = 0; i < array.length; i++) {
    if (new Set(array[i]).size === 1) {
      expandedRowArray.push(array[i].map(_ => emptyMarker))
    } else {
      expandedRowArray.push(array[i])
    }
  }

  // expand columns
  const expandedColumnArray: string[][] = expandedRowArray.map(_ => [])
  for (let i = 0; i < expandedRowArray[0].length; i++) {
    const columnValues = expandedRowArray.map((row: string[]) => row[i]).map(string => string === emptyMarker ? '.' : string)
    if (new Set(columnValues).size === 1) {
      expandedRowArray.forEach((row: string[], index) => {
        expandedColumnArray[index].push(emptyMarker)
      })
    } else {
      expandedRowArray.forEach((row: string[], index) => {
        expandedColumnArray[index].push(row[i])
      })
    }
  }

  return expandedColumnArray
}

export const breadthFirstSearch = (grid: string[][], startingX: number, startingY: number, endX: number, endY: number, spacingFactor: number): number => {
  const queue = []
  queue.push({ x: startingX, y: startingY, distance: 0 })

  const visited: boolean[][] = Array.from(Array(grid.length), () => Array(grid[0].length).fill(false))
  while (queue.length > 0) {
    const { x, y, distance } = queue.shift()!

    if (y === endY && x === endX) {
      return distance
    }

    directions.forEach(direction => {
      const neighborY = y + direction.y
      const neighborX = x + direction.x

      if (neighborExists(grid[0].length, grid.length, neighborY, neighborX) && !visited[neighborY][neighborX]) {
        visited[neighborY][neighborX] = true
        if (grid[neighborY][neighborX] === 'x') {
          queue.push({ x: neighborX, y: neighborY, distance: distance + spacingFactor })
        } else {
          queue.push({ x: neighborX, y: neighborY, distance: distance + 1 })
        }
      }
    })
  }

  return 0
}
