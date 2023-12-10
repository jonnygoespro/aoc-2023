import day10 from './index'
import fs from 'fs'

const expectedResultPart1 = '8'
const expectedResultPart2 = '1'

describe('On Day 10', () => {
  test('part1 runs with test input', async () => {
    const result = await day10.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day10.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })

  test('part2 works with other input', async () => {
    const input = (await fs.promises.readFile('./inputs/day10/test2.txt')).toString()
    const result = day10.solveForPartTwo(input)
    expect(result).toMatch((4).toString())
  })

  test('part2 works with other other input', async () => {
    const input = (await fs.promises.readFile('./inputs/day10/test3.txt')).toString()
    const result = day10.solveForPartTwo(input)
    expect(result).toMatch((4).toString())
  })
})
