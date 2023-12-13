import day12 from './index'

const expectedResultPart1 = '21'
const expectedResultPart2 = '525152'

describe('On Day 12', () => {
  test('part1 runs with test input', async () => {
    const result = await day12.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day12.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
