import day14 from './index'

const expectedResultPart1 = '136'
const expectedResultPart2 = '64'

describe('On Day 14', () => {
  test('part1 runs with test input', async () => {
    const result = await day14.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day14.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
