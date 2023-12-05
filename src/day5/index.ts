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
    let min: undefined | number
    const almanac = getAlmanac(input)

    const lines = input.split('\n\n')
    const numberArray = lines[0].split(':')[1].split(' ').filter((string) => string !== '').map((string) => Number(string))

    for (let n = 0; n < numberArray.length; n += 2) {
      for (let i = numberArray[n]; i < numberArray[n] + numberArray[n + 1] - 1; i++) {
        let mappedNumber = i
        almanac.maps.forEach((map) => {
          for (let r = 0; r < map.ranges.length; r++) {
            const range = map.ranges[r]
            if (mappedNumber >= range.from && mappedNumber <= range.to) {
              mappedNumber -= range.mapping
              break
            }
          }
        })
        if (min === undefined || mappedNumber < min) {
          min = mappedNumber
        }
      }
    }

    return min?.toString() ?? 'no min found'
  }
}

export default new Day5()
