export const create2dArray = (input: string): string[][] => {
  return input.split('\n').map((line) => line.split(''))
}

export const create2dArrayOfNumbers = (input: string): number[][] => {
  return input.split('\n').map((line) => line.split(' ').filter((string) => string !== '').map((string) => Number(string)))
}

export const create2dArrayOfSingleDigitNumbers = (input: string): number[][] => {
  return input.split('\n').map((line) => line.split('').filter((string) => string !== '').map((string) => Number(string)))
}

export const neighborExists = (width: number, height: number, neighborY: number, neighborX: number): boolean => {
  return !(neighborX < 0 || neighborX >= width || neighborY < 0 || neighborY >= height)
}

export const transposeMatrix = (matrix: string[][]): string[][] => {
  return matrix[0].map((_, i) => matrix.map(row => row[i]))
}

export const rotateMatrixLeft = (matrix: string[][]): string[][] => {
  const reversedMatrix = matrix.slice().reverse()
  const rotatedMatrix = transposeMatrix(reversedMatrix)
  return rotatedMatrix
}
