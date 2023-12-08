import { Day } from '../day'
import { calculateRepetitions, getInstructions, getNodes } from './functions'
import { lowestCommonMultiplier } from '../helpers/functions'
import { Node } from './models'

class Day8 extends Day {
  constructor () {
    super(8)
  }

  solveForPartOne (input: string): string {
    const instructions = getInstructions(input)
    const nodes = getNodes(input)

    let steps = 0
    let currentNode: Node = nodes.find(node => node.symbol === 'AAA')!

    while (currentNode.symbol !== 'ZZZ') {
      const instruction: string = instructions[steps % instructions.length]
      const nextSymbol = currentNode[instruction as keyof Node]
      currentNode = nodes.find(node => node.symbol === nextSymbol)!
      steps++
    }

    return steps.toString()
  }

  solveForPartTwo (input: string): string {
    const instructions = getInstructions(input)
    const nodes = getNodes(input)

    const startingNodes: Node[] = nodes.filter(node => node.symbol[2] === 'A')
    const repetitions: number[] = startingNodes.map((startingNode) => calculateRepetitions(startingNode, nodes, instructions))

    let result = 1
    for (let i = 0; i < repetitions.length; i++) {
      result = lowestCommonMultiplier(result, repetitions[i])
    }

    return result.toString()
  }
}

export default new Day8()
