import { Day } from '../day'
import { parseInput, findNewReflection, calculateReflectionSum } from './functions'

class Day13 extends Day {
  constructor () {
    super(13)
  }

  solveForPartOne (input: string): string {
    const reflections = parseInput(input)
    const result = calculateReflectionSum(reflections)
    return result.toString()
  }

  solveForPartTwo (input: string): string {
    let reflections = parseInput(input)
    reflections = reflections.map(reflection => findNewReflection(reflection))
    const result = calculateReflectionSum(reflections)
    return result.toString()
  }
}

export default new Day13()
