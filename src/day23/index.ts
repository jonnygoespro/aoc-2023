import { Day } from '../day'
import { create2dArray } from '../helpers/array'
import { breadthFirstSearch, depthFirstSearchOnCrossings } from './functions'

class Day23 extends Day {
  constructor () {
    super(23)
  }

  solveForPartOne (input: string): string {
    const map = create2dArray(input)
    const startX = map[0].findIndex(elem => elem === '.')
    const endX = map[map.length - 1].findIndex(elem => elem === '.')
    const shortestDistance = breadthFirstSearch(map, startX, 0, endX, map.length - 1)
    return shortestDistance.toString()
  }

  solveForPartTwo (input: string): string {
    const map = create2dArray(input)

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] !== '#' && map[y][x] !== '.') {
          map[y][x] = '.'
        }
      }
    }

    const startX = map[0].findIndex(elem => elem === '.')
    const endX = map[map.length - 1].findIndex(elem => elem === '.')
    const shortestDistance = depthFirstSearchOnCrossings(map, startX, 0, endX, map.length - 1)

    return shortestDistance.toString()
  }
}

export default new Day23()
