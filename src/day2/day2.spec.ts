import day2 from './index'

const expectedResultPart1 = '8'
const expectedResultPart2 = '2286'

describe('On Day 2', () => {
  test('part1 runs with test input', async () => {
    const result = await day2.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day2.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
