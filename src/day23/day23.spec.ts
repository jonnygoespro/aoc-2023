import day23 from './index'

const expectedResultPart1 = '94'
const expectedResultPart2 = '154'

describe('On Day 23', () => {
  test('part1 runs with test input', async () => {
    const result = await day23.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day23.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
