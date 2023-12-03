import { Day } from '../day'
import { createArrayOfArraysContainingAdjacentNumbers, createGears } from './utils/functions'

class Day3 extends Day {
  constructor () {
    super(3)
  }

  solveForPartOne (input: string): string {
    const array = createArrayOfArraysContainingAdjacentNumbers(input)
    const sum = array.map((line: string[]) => line.map(char => char === '' ? '.' : char).join(''))
      .map((line) => line.match(/[0-9]+/g)).flat().filter((line) => line !== null).reduce((a, b) => a + Number(b), 0)
    return sum.toString()
  }

  solveForPartTwo (input: string): string {
    const array = createArrayOfArraysContainingAdjacentNumbers(input)
    const gearsSum = createGears(array)
      .map((gear) => gear.number1 * gear.number2)
      .reduce((a, b) => a + b, 0)

    return gearsSum.toString()
  }
}

export default new Day3()
