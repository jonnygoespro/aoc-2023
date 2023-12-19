import day19 from './index'
import fs from 'fs'

const expectedResultPart1 = '19114'
const expectedResultPart2 = '167409079868000'

describe('On Day 19', () => {
  test('part1 runs with test input', async () => {
    const result = await day19.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day19.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })

  test('part2 runs with other input', async () => {
    const input = (await fs.promises.readFile('./inputs/day19/test2.txt')).toString()
    const result = day19.solveForPartTwo(input)
    expect(result).toMatch((1).toString())
  })
})
