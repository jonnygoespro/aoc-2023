import { Day } from '../day'
import { create2dArray } from '../helpers/array'
import { extractLoopFromMaze, fillMaze, scaleMaze } from './functions'

class Day10 extends Day {
  constructor () {
    super(10)
  }

  solveForPartOne (input: string): string {
    const maze = create2dArray(input)
    const cleanMaze = extractLoopFromMaze(maze)
    const result = cleanMaze.flat().filter(elem => elem !== '').length / 2
    return result.toString()
  }

  solveForPartTwo (input: string): string {
    const maze = create2dArray(input)
    const mazeWithLoop = extractLoopFromMaze(maze)
    const scaledMaze = scaleMaze(mazeWithLoop)
    const mazeFilledFromOutside = fillMaze(scaledMaze)

    // map back to maze
    for (let y = 0; y < mazeWithLoop.length; y++) {
      for (let x = 0; x < mazeWithLoop[0].length; x++) {
        mazeWithLoop[y][x] = mazeFilledFromOutside[y * 2][x * 2]
      }
    }

    const result = mazeWithLoop.flat().filter(elem => elem === '').length
    return result.toString()
  }
}

export default new Day10()
