import { Day } from '../day'
import { lowestCommonMultiplier } from '../helpers/functions'
import { executeButtonPress, executeButtonPressLookingForElement, parseInput } from './functions'

class Day20 extends Day {
  constructor () {
    super(20)
  }

  solveForPartOne (input: string): string {
    let modules = parseInput(input)
    let totalHighPulses = 0
    let totalLowPulses = 0

    for (let i = 0; i < 1000; i++) {
      const [highPulses, lowPulses, newModules] = executeButtonPress(modules)
      modules = newModules
      totalHighPulses += highPulses
      totalLowPulses += lowPulses
    }

    return (totalLowPulses * totalHighPulses).toString()
  }

  solveForPartTwo (input: string): string {
    const numbers: number[] = []

    for (let i = 0; i < 4; i++) {
      let modules = parseInput(input)
      let j = 0
      let end = false
      while (!end) {
        const lookingFor = (i === 0) ? 'xn' : (i === 1) ? 'qn' : (i === 2) ? 'xf' : 'zl'
        const [shouldBreak, newModules] = executeButtonPressLookingForElement(modules, lookingFor, 'high')
        modules = newModules
        end = shouldBreak
        j++
      }
      numbers.push(j)
    }

    let result = 1
    for (let i = 0; i < numbers.length; i++) {
      result = lowestCommonMultiplier(result, numbers[i])
    }

    return (result).toString()
  }
}

export default new Day20()
