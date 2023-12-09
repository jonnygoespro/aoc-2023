import { Day } from '../day'
import { extendDerivations, generateDerivations, parseInput } from './functions'

class Day9 extends Day {
  constructor () {
    super(9)
  }

  solveForPartOne (input: string): string {
    const lines = parseInput(input)

    let sum = 0
    lines.forEach(line => {
      const derivations = generateDerivations(line)
      const extendedDerivations = extendDerivations(derivations)
      sum += extendedDerivations[0][extendedDerivations[0].length - 1]
    })

    return sum.toString()
  }

  solveForPartTwo (input: string): string {
    const lines = parseInput(input)

    let sum = 0
    lines.map(line => line.reverse()).forEach(line => {
      const derivations = generateDerivations(line)
      const extendedDerivations = extendDerivations(derivations)
      sum += extendedDerivations[0][extendedDerivations[0].length - 1]
    })

    return sum.toString()
  }
}

export default new Day9()
