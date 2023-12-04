import { Day } from '../day'
import { parseInput } from './utils/functions'

class Day4 extends Day {
  constructor () {
    super(4)
  }

  solveForPartOne (input: string): string {
    const cards = parseInput(input)
    const result = cards.map((card) => card.myNumbers.filter((number) => card.winningNumbers.includes(number)).length)
      .filter(length => length > 0)
      .map(length => Math.pow(2, length - 1))
      .reduce((a, b) => a + b, 0)

    return result.toString()
  }

  solveForPartTwo (input: string): string {
    const cards = parseInput(input)

    for (let c = 0; c < cards.length; c++) {
      const guessedNumberCount = cards[c].myNumbers.filter((number) => cards[c].winningNumbers.includes(number)).length
      for (let i = 1; i <= guessedNumberCount; i++) {
        cards[c + i].amount += 1 * cards[c].amount
      }
    }

    const result = cards.reduce((a, b) => a + b.amount, 0)
    return result.toString()
  }
}

export default new Day4()
