import { Day } from '../day'
import { getAlmanac, getSeedsPart1 } from './utils/functions'

class Day5 extends Day {
  constructor () {
    super(5)
  }

  solveForPartOne (input: string): string {
    const seeds = getSeedsPart1(input)
    const almanac = getAlmanac(input)
    const locations: number[] = []

    seeds.forEach((seed) => {
      let mappedNumber = seed
      almanac.maps.forEach((map) => {
        for (let r = 0; r < map.ranges.length; r++) {
          const range = map.ranges[r]
          if (mappedNumber >= range.from && mappedNumber <= range.to) {
            mappedNumber -= range.mapping
            break
          }
        }
      })
      locations.push(mappedNumber)
    })

    const min = Math.min.apply(null, locations)
    return min.toString()
  }

  solveForPartTwo (input: string): string {
    const almanac = getAlmanac(input)

    const lines = input.split('\n\n')
    const numberArray = lines[0].split(':')[1].split(' ').filter((string) => string !== '').map((string) => Number(string))

    let lowestIndex = 0
    let minWasFound = false
    while (!minWasFound) {
      let mappedNumber = lowestIndex
      for (let m = almanac.maps.length - 1; m >= 0; m--) {
        const map = almanac.maps[m]

        for (let r = map.ranges.length - 1; r >= 0; r--) {
          const range = map.ranges[r]
          if (mappedNumber + range.mapping >= range.from && mappedNumber + range.mapping <= range.to) {
            mappedNumber += range.mapping
            break
          }
        }
      }

      for (let n = 0; n < numberArray.length; n += 2) {
        if (mappedNumber >= numberArray[n] && mappedNumber <= numberArray[n] + numberArray[n + 1] - 1) {
          minWasFound = true
        }
      }

      if (!minWasFound) {
        lowestIndex++
      }
    }

    return lowestIndex.toString()
  }
}

export default new Day5()
