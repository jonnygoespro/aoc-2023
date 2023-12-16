import day16 from './index'

const expectedResultPart1 = '46'
const expectedResultPart2 = '51'

describe('On Day 16', () => {
  test('part1 runs with test input', async () => {
    const result = await day16.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day16.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
