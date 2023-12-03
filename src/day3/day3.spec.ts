import day3 from './index'

const expectedResultPart1 = '4361'
const expectedResultPart2 = '467835'

describe('On Day 3', () => {
  test('part1 runs with test input', async () => {
    const result = await day3.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day3.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
