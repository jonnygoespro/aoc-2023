import day21 from './index'
import fs from 'fs'

const expectedResultPart1 = '16'
const expectedResultPart2 = '50'

describe('On Day 21', () => {
  // test('part1 runs with test input', async () => {
  //   const result = await day21.testInputPartOne()
  //   expect(result).toMatch(expectedResultPart1)
  // })

  test('part2 runs with test input', async () => {
    const result = await day21.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })

  // test('part2 runs with other input', async () => {
  //   const input = (await fs.promises.readFile('./inputs/day21/test2.txt')).toString()
  //   const result = day21.solveForPartTwo(input)
  //   expect(result).toMatch((4).toString())
  // })
})
