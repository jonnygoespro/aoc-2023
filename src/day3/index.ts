import { Day } from '../day'
import { createSymbols } from './utils/functions'

class Day3 extends Day {
  constructor () {
    super(3)
  }

  solveForPartOne (input: string): string {
    const symbols = createSymbols(input)
    const result = symbols.map(symbol => symbol.adjacentNumbers.reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
    return result.toString()
  }

  solveForPartTwo (input: string): string {
    const symbols = createSymbols(input)
    const result = symbols.filter(symbol => symbol.adjacentNumbers.length === 2)
      .map(symbol => symbol.adjacentNumbers.reduce((a, b) => a * b, 1))
      .reduce((a, b) => a + b, 0)
    return result.toString()
  }
}

export default new Day3()
