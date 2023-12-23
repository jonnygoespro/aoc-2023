import day20 from './index'
import fs from 'fs'

const expectedResultPart1 = '32000000'

describe('On Day 20', () => {
  test('part1 runs with test input', async () => {
    const result = await day20.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part1 runs with other input', async () => {
    const input = (await fs.promises.readFile('./inputs/day20/test2.txt')).toString()
    const result = day20.solveForPartOne(input)
    expect(result).toMatch((11687500).toString())
  })

  test('part1 runs with other input', async () => {
    const input = (await fs.promises.readFile('./inputs/day20/test4.txt')).toString()
    const result = day20.solveForPartOne(input)
    expect(result).toMatch((2000 * 1000).toString())
  })

  test('part1 runs with other input', async () => {
    const input = (await fs.promises.readFile('./inputs/day20/test6.txt')).toString()
    const result = day20.solveForPartOne(input)
    expect(result).toMatch((3500 * 4500).toString())
  })
})
