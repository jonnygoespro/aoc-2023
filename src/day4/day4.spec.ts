import day4 from './index'

const expectedResultPart1 = '13'
const expectedResultPart2 = '30'

describe('On Day 4', () => {
  test('part1 runs with test input', async () => {
    const result = await day4.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day4.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
