import { Day } from '../day'
import { create2dArrayOfSingleDigitNumbers } from '../helpers/array'
import { dijkstraPartOne, dijkstraPartTwo } from './functions'

class Day17 extends Day {
  constructor () {
    super(17)
  }

  solveForPartOne (input: string): string {
    const graph = create2dArrayOfSingleDigitNumbers(input)
    const distances = dijkstraPartOne(graph)

    let result = Number.MAX_VALUE
    const lastElement = distances[distances.length - 1][distances[0].length - 1]
    Object.keys(lastElement).forEach((key) => {
      lastElement[key as 'left' | 'top' | 'bottom' | 'right'].forEach(element => {
        if (element < result) {
          result = element
        }
      })
    })

    return result.toString()
  }

  solveForPartTwo (input: string): string {
    const graph = create2dArrayOfSingleDigitNumbers(input)
    const distances = dijkstraPartTwo(graph)

    let result = Number.MAX_VALUE
    const lastElement = distances[distances.length - 1][distances[0].length - 1]
    Object.keys(lastElement).forEach((key) => {
      lastElement[key as 'left' | 'top' | 'bottom' | 'right'].forEach(element => {
        if (element < result) {
          result = element
        }
      })
    })

    return result.toString()
  }
}

export default new Day17()
