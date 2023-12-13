import { Day } from '../day'
import { calculatePossibilities, expandRow, parseInput } from './functions'

class Day12 extends Day {
  constructor () {
    super(12)
  }

  solveForPartOne (input: string): string {
    const rows = parseInput(input)

    let sum = 0
    rows.forEach(row => {
      sum += calculatePossibilities(row)
    })

    return sum.toString()
  }

  solveForPartTwo (input: string): string {
    const rows = parseInput(input)
    const expandedRows = rows.map(row => expandRow(row))

    let sum = 0
    expandedRows.forEach((row, index) => {
      console.log('calculating ', index)
      sum += calculatePossibilities(row)
    })

    return sum.toString()
  }
}

export default new Day12()
