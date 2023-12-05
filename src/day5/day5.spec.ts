import day5 from './index'

const expectedResultPart1 = '35'
const expectedResultPart2 = '46'

describe('On Day 5', () => {
  test('part1 runs with test input', async () => {
    const result = await day5.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day5.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
