import { Day } from '../day'
import { Range, buildTree, countPossibilities, executePart, parseInput } from './functions'

class Day19 extends Day {
  constructor () {
    super(19)
  }

  solveForPartOne (input: string): string {
    const [instructionChains, parts] = parseInput(input)

    let result = 0
    parts.forEach(part => {
      const accepted = executePart(part, instructionChains)
      if (accepted) {
        result += part.x + part.m + part.a + part.s
      }
    })

    return result.toString()
  }

  // 181004445795007 -> too high
  // 164611348183216 -> too high
  // 126526760638332 -> just wrong
  solveForPartTwo (input: string): string {
    const [instructionChains] = parseInput(input)
    const tree = buildTree(instructionChains)
    const ranges = countPossibilities(tree.instructions!, 1, 4000, 1, 4000, 1, 4000, 1, 4000, [])

    const newRanges: Range[][] = []
    ranges.forEach((range) => {
      const index = newRanges.findIndex(element => (element[0].from === range[0].from && element[0].to === range[0].to && element[0].symbol === range[0].symbol) &&
        (element[1].from === range[1].from && element[1].to === range[1].to && element[1].symbol === range[1].symbol) &&
        (element[2].from === range[2].from && element[2].to === range[2].to && element[2].symbol === range[2].symbol) &&
        (element[3].from === range[3].from && element[3].to === range[3].to && element[3].symbol === range[3].symbol)
      )

      if (index === -1) {
        newRanges.push(range)
      }
    })

    let result = 0
    newRanges.forEach(range => {
      result += (range[0].to - range[0].from + 1) * (range[1].to - range[1].from + 1) * (range[2].to - range[2].from + 1) * (range[3].to - range[3].from + 1)
    })

    return result.toString()
  }
}

export default new Day19()
