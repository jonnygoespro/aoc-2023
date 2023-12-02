import { Day } from '../day'
import { parseInput, calculatePossibility, calculateFewestCubes } from './utils/functions'

class Day2 extends Day {
  constructor () {
    super(2)
  }

  solveForPartOne (input: string): string {
    const games = parseInput(input)
    games.map((game) => calculatePossibility(game))

    let sum = 0
    games.forEach((game) => {
      if (game.possible ?? false) {
        sum += game.id
      }
    })
    return sum.toString()
  }

  solveForPartTwo (input: string): string {
    const games = parseInput(input)
    games.map((game) => calculateFewestCubes(game))

    let sum = 0
    games.forEach((game) => {
      sum += game.fewestNumbers ?? 0
    })
    return sum.toString()
  }
}

export default new Day2()
