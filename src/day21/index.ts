import { Day } from '../day'
import { create2dArray } from '../helpers/array'
import { breadthFirstSearch, calculateFirstThreeFunctionParameters, f } from './functions'

class Day21 extends Day {
  constructor () {
    super(21)
  }

  solveForPartOne (input: string): string {
    const map = create2dArray(input)
    const result = breadthFirstSearch(map, 64)
    return result.toString()
  }

  solveForPartTwo (input: string): string {
    const map = create2dArray(input)
    const [x1, x2, x3] = calculateFirstThreeFunctionParameters(map)
    return (f(Math.floor(26501365 / 131), x1, x2, x3)).toString()
  }
}

export default new Day21()
