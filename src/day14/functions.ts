import { rotateMatrixLeft } from '../helpers/array'

export const tiltMap = (map: string[][]): string[][] => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === 'O') {
        let localY = y
        while (localY > 0 && map[localY - 1][x] === '.') {
          map[localY - 1][x] = 'O'
          map[localY][x] = '.'
          localY--
        }
      }
    }
  }
  return map
}

export const executeOneCylce = (map: string[][]): string[][] => {
  for (let j = 0; j < 4; j++) {
    map = tiltMap(map)
    map = rotateMatrixLeft(map)
  }
  return map
}
