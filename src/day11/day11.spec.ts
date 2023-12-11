import day11 from './index'

const expectedResultPart1 = '374'
const expectedResultPart2 = '82000210'

describe('On Day 11', () => {
  test('part1 runs with test input', async () => {
    const result = await day11.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day11.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
