import { create2dArrayOfNumbers } from '../../helpers/array'
import { Almanac, Map } from '../models/models'

export const getAlmanac = (input: string): Almanac => {
  const lines = input.split('\n\n')
  const almanac: Almanac = {
    maps: []
  }

  for (let i = 1; i < lines.length; i++) {
    const mapString = lines[i].split('\n').slice(1).join('\n')
    const maps = create2dArrayOfNumbers(mapString)

    const newMap: Map = {
      ranges: []
    }
    maps.forEach((map) => {
      newMap.ranges.push({
        from: map[1],
        to: map[1] + map[2] - 1,
        mapping: map[1] - map[0]
      })
    })
    almanac.maps.push(newMap)
  }

  return almanac
}

export const getSeedsPart1 = (input: string): number[] => {
  const lines = input.split('\n\n')
  return lines[0].split(':')[1].split(' ').filter((string) => string !== '').map((string) => Number(string))
}
