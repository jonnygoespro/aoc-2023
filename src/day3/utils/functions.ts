import { create2dArray, neighborExists } from '../../helpers/array'
import { directionsWithDiagonals } from '../../helpers/directions'
import { Symbol } from '../models/symbol'

const isSymbol = (char: string): boolean => {
  return isNaN(Number(char)) && char !== '.'
}

const isNumber = (char: string): boolean => {
  return char !== '' && char !== '.' && !isNaN(Number(char))
}

const getWholeNumber = (array: string[][], y: number, x: number): [string[][], number] => {
  let startingPosition = x
  while (startingPosition > 0 && isNumber(array[y][startingPosition - 1])) {
    startingPosition--
  }

  let numberString = ''
  for (let x = startingPosition; x < array[y].length; x++) {
    if (isNumber(array[y][x])) {
      numberString += array[y][x]
      array[y][x] = '.'
    } else {
      break
    }
  }

  return [array, Number(numberString)]
}

export const createSymbols = (input: string): Symbol[] => {
  let array = create2dArray(input)
  const symbols: Symbol[] = []

  const height = array.length
  const width = array[0].length
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (isSymbol(array[y][x])) {
        const newSymbol: Symbol = {
          x,
          y,
          symbol: array[y][x],
          adjacentNumbers: []
        }

        directionsWithDiagonals.forEach(direction => {
          const neighborY = y + direction.y
          const neighborX = x + direction.x
          if (neighborExists(width, height, neighborY, neighborX)) {
            const neighbor = array[neighborY][neighborX]
            if (isNumber(neighbor)) {
              let number
              [array, number] = getWholeNumber(array, neighborY, neighborX)
              newSymbol.adjacentNumbers.push(number)
            }
          }
        })

        symbols.push(newSymbol)
      }
    }
  }

  return symbols
}
