import { Node } from './models'

export const getInstructions = (input: string): string[] => {
  return input.split('\n\n')[0].split('')
}

export const getNodes = (input: string): Node[] => {
  return input.split('\n\n')[1]
    .split('\n')
    .map(line => {
      return {
        symbol: line.substring(0, 3),
        L: line.substring(7, 10),
        R: line.substring(12, 15)
      }
    })
}

export const calculateRepetitions = (startingNode: Node, nodes: Node[], instructions: string[]): number => {
  const visitedNodes: Node[] = [startingNode]
  let repetitions = 0

  while (visitedNodes[visitedNodes.length - 1].symbol[2] !== 'Z') {
    const instruction: string = instructions[repetitions % instructions.length]
    const nextNode = nodes.find((node) => node.symbol === visitedNodes[visitedNodes.length - 1][instruction as keyof Node])!
    visitedNodes.push(nextNode)
    repetitions++
  }

  return repetitions
}
