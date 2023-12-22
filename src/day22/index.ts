import { Day } from '../day'
import { applyGravity, calculateDisintegratableBricks, countFallingBricks, parseInput } from './functions'

class Day22 extends Day {
  constructor () {
    super(22)
  }

  solveForPartOne (input: string): string {
    let bricks = parseInput(input)
    bricks.sort((a, b) => a.from[2] - b.from[2])
    bricks = applyGravity(bricks)
    const result = calculateDisintegratableBricks(bricks)
    return result.toString()
  }

  solveForPartTwo (input: string): string {
    let bricks = parseInput(input)
    bricks.sort((a, b) => a.from[2] - b.from[2])
    bricks = applyGravity(bricks)
    const result = countFallingBricks(bricks)
    return result.toString()
  }
}

export default new Day22()
