import day1 from './index'

const expectedResultPart1 = '142'
const expectedResultPart2 = '281'

describe('On Day 1', () => {
  test('part1 runs with test input', async () => {
    const result = await day1.testInputPartOne()
    expect(result).toMatch(expectedResultPart1)
  })

  test('part2 runs with test input', async () => {
    const newInput = `two1nine
      eightwothree
      abcone2threexyz
      xtwone3four
      4nineeightseven2
      zoneight234
      7pqrstsixteen`
    const result = day1.solveForPartTwo(newInput)
    expect(result).toMatch(expectedResultPart2)
  })

  test('part2 edge case eighthree equals 83', async () => {
    const newInput = 'eighthree'
    const result = day1.solveForPartTwo(newInput)
    expect(result).toMatch('83')
  })

  test('part2 edge case sevenine equals 79', async () => {
    const newInput = 'sevenine'
    const result = day1.solveForPartTwo(newInput)
    expect(result).toMatch('79')
  })
})
