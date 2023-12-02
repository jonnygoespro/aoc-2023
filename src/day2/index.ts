import { Day } from '../day'
import { parseInput, calculatePossibility, calculateFewestCubes } from './utils/functions'

class Day2 extends Day {
  constructor () {
    super(2)
  }

  solveForPartOne (input: string): string {
    return parseInput(input)
      .map((game) => calculatePossibility(game))
      .filter((game) => game.possible ?? false)
      .map((game) => game.id)
      .reduce((a, b) => a + b, 0)
      .toString()
  }

  solveForPartTwo (input: string): string {
    return parseInput(input)
      .map((game) => calculateFewestCubes(game))
      .map((game) => game.fewestNumbers ?? 0)
      .reduce((a, b) => a + b, 0)
      .toString()
  }
}

export default new Day2()
