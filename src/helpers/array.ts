export const create2dArray = (input: string): string[][] => {
  return input.split('\n').map((line) => line.split(''))
}

export const create2dArrayOfNumbers = (input: string): number[][] => {
  return input.split('\n').map((line) => line.split(' ').filter((string) => string !== '').map((string) => Number(string)))
}

export const neighborExists = (width: number, height: number, neighborY: number, neighborX: number): boolean => {
  return !(neighborX < 0 || neighborX >= width || neighborY < 0 || neighborY >= height)
}
