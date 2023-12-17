import day17 from './index'
import fs from 'fs'

const expectedResultPart1 = '102'
const expectedResultPart2 = ''

describe('On Day 17', () => {
  test('part1 works with own input', async () => {
    const input = (await fs.promises.readFile('./inputs/day17/test2.txt')).toString()
    const result = day17.solveForPartOne(input)
    expect(result).toMatch((7).toString())
  })

  test('part1 runs with test input', async () => {
    const result = await day17.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day17.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
