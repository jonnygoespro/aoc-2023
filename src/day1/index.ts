import { Day } from '../day'
import { transformInputPart1, transformInputPart2 } from './utils/functions'

class Day1 extends Day {
  constructor () {
    super(1)
  }

  solveForPartOne (input: string): string {
    const calibrations = transformInputPart1(input)

    let sum = 0
    calibrations.forEach((cal) => {
      sum += cal.num
    })
    return sum.toString()
  }

  solveForPartTwo (input: string): string {
    const calibrations = transformInputPart2(input)

    let sum = 0
    calibrations.forEach((cal) => {
      sum += cal.num
    })
    return sum.toString()
  }
}

export default new Day1()
