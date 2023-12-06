import day6 from './index'

const expectedResultPart1 = '288'
const expectedResultPart2 = '71503'

describe('On Day 6', () => {
  test('part1 runs with test input', async () => {
    const result = await day6.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day6.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
