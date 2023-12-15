import day15 from './index'

const expectedResultPart1 = '1320'
const expectedResultPart2 = '145'

describe('On Day 15', () => {
  test('part1 runs with test input', async () => {
    const result = await day15.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day15.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
