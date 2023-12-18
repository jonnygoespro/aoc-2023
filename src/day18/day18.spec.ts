import day18 from './index'

const expectedResultPart1 = '62'
const expectedResultPart2 = '952408144115'

describe('On Day 18', () => {
  test('part1 runs with test input', async () => {
    const result = await day18.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const result = await day18.testInputPartTwo()
    expect(result).toMatch(expectedResultPart2)
  })
})
