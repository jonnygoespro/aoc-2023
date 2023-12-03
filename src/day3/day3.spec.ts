import day3 from './index'
import fs from 'fs'

const expectedResultPart1 = '4361'
const expectedResultPart2 = '467835'

describe('On Day 3', () => {
  test('part1 runs with test input', async () => {
    const result = await day3.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day3.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })

  test('part2 works with edge case where 2 adjacent numbers are the same', async () => {
    const input = (await fs.promises.readFile('./inputs/day3/test2.txt')).toString()
    const result = day3.solveForPartTwo(input)
    expect(result).toMatch((35 * 35 + 755 * 598).toString())
  })
})
