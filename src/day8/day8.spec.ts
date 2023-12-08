import day8 from './index'
import fs from 'fs'

const expectedResultPart1 = '6'
const expectedResultPart2 = '6'

describe('On Day 8', () => {
  test('part1 runs with test input', async () => {
    const result = await day8.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day8.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })

  test('part2 works with other input', async () => {
    const input = (await fs.promises.readFile('./inputs/day8/test2.txt')).toString()
    const result = day8.solveForPartTwo(input)
    expect(result).toMatch((6).toString())
  })
})
