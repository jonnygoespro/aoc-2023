import { Gear } from '../models/gear'

export const createArrayOfArraysContainingAdjacentNumbers = (input: string): string[][] => {
  const originalArray = input.split('\n').map((line) => line.split(''))
  const arrayWithAdjacentNumbers = saveNumbersAdjacentToSymbols(originalArray)
  const arrayWithNumbers = saveAdjacentNumbersToNumbers(arrayWithAdjacentNumbers, originalArray)
  return arrayWithNumbers
}

const isSymbol = (char: string): boolean => {
  return isNaN(Number(char)) && char !== '.'
}

const isNumber = (char: string): boolean => {
  return char !== '' && !isNaN(Number(char))
}

const saveNumbersAdjacentToSymbols = (array: string[][]): string[][] => {
  const newArray = array.map((line) => line.map((_) => ''))
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (isSymbol(array[i][j])) {
        newArray[i][j] = array[i][j]
        // top left
        if (i - 1 >= 0 && j - 1 >= 0 && isNumber(array[i - 1][j - 1])) newArray[i - 1][j - 1] = array[i - 1][j - 1]
        // top center
        if (i - 1 >= 0 && isNumber(array[i - 1][j])) newArray[i - 1][j] = array[i - 1][j]
        // top right
        if (i - 1 >= 0 && j + 1 < array[i].length && isNumber(array[i - 1][j + 1])) newArray[i - 1][j + 1] = array[i - 1][j + 1]
        // center right
        if (j + 1 < array[i].length && isNumber(array[i][j + 1])) newArray[i][j + 1] = array[i][j + 1]
        // bottom right
        if (i + 1 < array.length && j + 1 < array[i].length && isNumber(array[i + 1][j + 1])) newArray[i + 1][j + 1] = array[i + 1][j + 1]
        // bottom center
        if (i + 1 < array.length && isNumber(array[i + 1][j])) newArray[i + 1][j] = array[i + 1][j]
        // bottom left
        if (i + 1 < array.length && j - 1 >= 0 && isNumber(array[i + 1][j - 1])) newArray[i + 1][j - 1] = array[i + 1][j - 1]
        // center left
        if (j - 1 >= 0 && isNumber(array[i][j - 1])) newArray[i][j - 1] = array[i][j - 1]
      }
    }
  }
  return newArray
}

export const saveAdjacentNumbersToNumbers = (arrayWithNumbers: string[][], originalArray: string[][]): string[][] => {
  // now loop through array and if find number and before not number check and copy
  for (let i = 0; i < arrayWithNumbers.length; i++) {
    for (let j = 0; j < arrayWithNumbers[i].length; j++) {
      if (arrayWithNumbers[i][j] !== '') {
        // run left
        let localJ = j
        while (localJ - 1 >= 0 && isNumber(originalArray[i][localJ - 1])) {
          arrayWithNumbers[i][localJ - 1] = originalArray[i][localJ - 1]
          localJ--
        }

        // run right
        localJ = j
        while (localJ + 1 < arrayWithNumbers[i].length && isNumber(originalArray[i][localJ + 1])) {
          arrayWithNumbers[i][localJ + 1] = originalArray[i][localJ + 1]
          localJ++
        }
      }
    }
  }
  return arrayWithNumbers
}

export const createGears = (array: string[][]): Gear[] => {
  const gears: Gear[] = []
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (isSymbol(array[i][j])) {
        const adjacentNumbers: number[] = []
        // top left
        if (i - 1 >= 0 && j - 1 >= 0 && isNumber(array[i - 1][j - 1])) {
          const number = findWholeNumber(array, i - 1, j - 1)
          if (!adjacentNumbers.includes(number)) {
            adjacentNumbers.push(number)
          }
        }
        // top center
        if (i - 1 >= 0 && isNumber(array[i - 1][j])) {
          const number = findWholeNumber(array, i - 1, j)
          if (!adjacentNumbers.includes(number)) {
            adjacentNumbers.push(number)
          }
        }
        // top right
        if (i - 1 >= 0 && j + 1 < array[i].length && isNumber(array[i - 1][j + 1])) {
          const number = findWholeNumber(array, i - 1, j + 1)
          if (!adjacentNumbers.includes(number)) {
            adjacentNumbers.push(number)
          }
        }
        // center right
        if (j + 1 < array[i].length && isNumber(array[i][j + 1])) {
          const number = findWholeNumber(array, i, j + 1)
          if (!adjacentNumbers.includes(number)) {
            adjacentNumbers.push(number)
          }
        }
        // bottom right
        if (i + 1 < array.length && j + 1 < array[i].length && isNumber(array[i + 1][j + 1])) {
          const number = findWholeNumber(array, i + 1, j + 1)
          if (!adjacentNumbers.includes(number)) {
            adjacentNumbers.push(number)
          }
        }
        // bottom center
        if (i + 1 < array.length && isNumber(array[i + 1][j])) {
          const number = findWholeNumber(array, i + 1, j)
          if (!adjacentNumbers.includes(number)) {
            adjacentNumbers.push(number)
          }
        }
        // bottom left
        if (i + 1 < array.length && j - 1 >= 0 && isNumber(array[i + 1][j - 1])) {
          const number = findWholeNumber(array, i + 1, j - 1)
          if (!adjacentNumbers.includes(number)) {
            adjacentNumbers.push(number)
          }
        }
        // center left
        if (j - 1 >= 0 && isNumber(array[i][j - 1])) {
          const number = findWholeNumber(array, i, j - 1)
          if (!adjacentNumbers.includes(number)) {
            adjacentNumbers.push(number)
          }
        }

        if (adjacentNumbers.length === 2) {
          gears.push({
            number1: adjacentNumbers[0],
            number2: adjacentNumbers[1]
          })
        }
      }
    }
  }

  return gears
}

const findWholeNumber = (array: string[][], i: number, j: number): number => {
  let localJ = j
  while (localJ - 1 >= 0 && isNumber(array[i][localJ - 1])) {
    localJ--
  } // local j now start index
  let numberString = ''
  while (localJ < array[i].length && isNumber(array[i][localJ])) {
    numberString += array[i][localJ]
    localJ++
  }
  return Number(numberString)
}
