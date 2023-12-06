import { Day } from '../day'
import { calculateVictoryRuns, parseInputPart1, parseInputPart2 } from './utils/functions'

class Day6 extends Day {
  constructor () {
    super(6)
  }

  solveForPartOne (input: string): string {
    const races = parseInputPart1(input)

    races.forEach((race) => {
      race.victoryRuns = calculateVictoryRuns(race)
    })

    const result = races.map(race => race.victoryRuns).reduce((a, b) => a * b, 1)
    return result.toString()
  }

  solveForPartTwo (input: string): string {
    const race = parseInputPart2(input)
    race.victoryRuns = calculateVictoryRuns(race)
    return race.victoryRuns.toString()
  }
}

export default new Day6()
