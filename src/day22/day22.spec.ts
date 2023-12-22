import day22 from './index'
import fs from 'fs'

const expectedResultPart1 = '5'
const expectedResultPart2 = '7'

describe('On Day 22', () => {
  test('part1 runs with test input', async () => {
    const result = await day22.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part1 runs with other input', async () => {
    const input = (await fs.promises.readFile('./inputs/day22/test2.txt')).toString()
    const result = day22.solveForPartOne(input)
    expect(result).toMatch((3).toString())
  })

  test('part2 runs with test input', async () => {
    const result = await day22.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
