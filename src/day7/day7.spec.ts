import day7 from './index'

const expectedResultPart1 = '6440'
const expectedResultPart2 = '5905'

describe('On Day 7', () => {
  test('part1 runs with test input', async () => {
    const result = await day7.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day7.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
