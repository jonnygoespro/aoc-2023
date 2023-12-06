import { Day } from '../day'
import { calculateVictoryRunsMathematically, parseInputPart1, parseInputPart2 } from './utils/functions'

class Day6 extends Day {
  constructor () {
    super(6)
  }

  solveForPartOne (input: string): string {
    const races = parseInputPart1(input)

    races.forEach((race) => {
      race.victoryRuns = calculateVictoryRunsMathematically(race)
    })

    const result = races.map(race => race.victoryRuns).reduce((a, b) => a * b, 1)
    return result.toString()
  }

  solveForPartTwo (input: string): string {
    const race = parseInputPart2(input)
    race.victoryRuns = calculateVictoryRunsMathematically(race)
    return race.victoryRuns.toString()
  }
}

export default new Day6()
