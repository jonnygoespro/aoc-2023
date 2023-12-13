import day13 from './index'

const expectedResultPart1 = '405'
const expectedResultPart2 = '400'

describe('On Day 13', () => {
  test('part1 runs with test input', async () => {
    const result = await day13.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day13.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
