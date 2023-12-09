import day9 from './index'

const expectedResultPart1 = '114'
const expectedResultPart2 = '2'

describe('On Day 9', () => {
  test('part1 runs with test input', async () => {
    const result = await day9.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day9.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
