import { Day } from '../day'
import { calculateArea, parseInput, parseInputPartTwo } from './functions'

class Day18 extends Day {
  constructor () {
    super(18)
  }

  solveForPartOne (input: string): string {
    const [corners, trench] = parseInput(input)
    const area = calculateArea(corners)
    return (trench * 0.5 + area + 1).toString()
  }

  solveForPartTwo (input: string): string {
    const [corners, trench] = parseInputPartTwo(input)
    const area = calculateArea(corners)
    return (trench * 0.5 + area + 1).toString()
  }
}

export default new Day18()
