import day20 from './index'

const expectedResultPart1 = ''
const expectedResultPart2 = ''

describe('On Day 20', () => {
  test('part1 runs with test input', async () => {
    const result = await day20.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day20.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
