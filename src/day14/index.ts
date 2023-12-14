import { Day } from '../day'
import { create2dArray } from '../helpers/array'
import { executeOneCylce, tiltMap } from './functions'

class Day14 extends Day {
  constructor () {
    super(14)
  }

  solveForPartOne (input: string): string {
    const map = create2dArray(input)
    const tiltedMap = tiltMap(map)
    const sum = tiltedMap.reduce((prev: number, current: string[], index: number) => {
      return prev + (tiltedMap.length - index) * current.filter(rock => rock === 'O').length
    }, 0)
    return sum.toString()
  }

  solveForPartTwo (input: string): string {
    let tiltedMap = create2dArray(input)
    const states: string[] = []

    let cycleStartIndex = 0
    let cycleEndIndex = 0
    for (cycleEndIndex = 0; cycleEndIndex < 1000000000; cycleEndIndex++) {
      tiltedMap = executeOneCylce(tiltedMap)

      const flattenedMap = tiltedMap.flat().join('')
      if (!states.includes(flattenedMap)) {
        states.push(flattenedMap)
      } else {
        cycleStartIndex = states.findIndex(state => state === flattenedMap)
        break
      }
    }

    let missingCycles = (1000000000 - (cycleStartIndex + 2)) % (cycleEndIndex - cycleStartIndex)
    while (missingCycles >= 0) {
      tiltedMap = executeOneCylce(tiltedMap)
      missingCycles--
    }

    const sum = tiltedMap.reduce((prev: number, current: string[], index: number) => {
      return prev + (tiltedMap.length - index) * current.filter(rock => rock === 'O').length
    }, 0)
    return sum.toString()
  }
}

export default new Day14()
