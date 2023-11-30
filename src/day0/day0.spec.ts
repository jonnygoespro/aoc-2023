import day0 from './index'

const expectedResultPart1 = ''
const expectedResultPart2 = ''

describe('On Day 0', () => {
  test('part1 runs with test input', async () => {
    const result = await day0.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day0.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
