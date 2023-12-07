import { Day } from '../day'
import { parseInput, rankHands, calculateWinningSum } from './functions'

class Day7 extends Day {
  constructor () {
    super(7)
  }

  solveForPartOne (input: string): string {
    const hands = parseInput(input, 1)
    rankHands(hands)
    return calculateWinningSum(hands)
  }

  solveForPartTwo (input: string): string {
    const hands = parseInput(input, 2)
    rankHands(hands)
    return calculateWinningSum(hands)
  }
}

export default new Day7()
