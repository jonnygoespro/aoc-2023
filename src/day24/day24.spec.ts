import day24 from './index'

const expectedResultPart1 = '2'
const expectedResultPart2 = '47'

describe('On Day 24', () => {
  test('part1 runs with test input', async () => {
    const result = await day24.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day24.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
