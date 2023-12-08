import { Day } from '../day'
import { getLRInstructions, getNodes } from './functions'
import { Node } from './models'

class Day8 extends Day {
  constructor () {
    super(8)
  }

  solveForPartOne (input: string): string {
    const instructions = getLRInstructions(input)
    const nodes = getNodes(input)
    
    let steps = 0
    let currentNode: Node | undefined = nodes.find(node => node.symbol === 'AAA')
    while (currentNode !== undefined && currentNode.symbol !== 'ZZZ') {
      const instruction: string = instructions[steps % instructions.length]
      currentNode = nodes.find(node => {
        if (currentNode !== undefined) {
          return node.symbol === currentNode[instruction as keyof Node]
        }
      })
      steps++
    }
    return steps.toString()
  }

  solveForPartTwo (input: string): string {
    const instructions = getLRInstructions(input)
    const nodes = getNodes(input)
    const startingNodes: Node[] = nodes.filter(node => node.symbol[2] === 'A')
    const repetitions: number[] = []

    startingNodes.forEach((startingNode) => {
      // calculate when it repeats
      let visitedNodes: Node[] = [startingNode]
      let counter = 0
      while (visitedNodes[visitedNodes.length - 1].symbol[2] !== 'Z') {
        const instruction: string = instructions[counter % instructions.length]
        const nextNode = nodes.find(node => {
          return node.symbol === visitedNodes[visitedNodes.length - 1][instruction as keyof Node]
        })

        if (nextNode !== undefined) {
          visitedNodes.push(nextNode)
        } else {
          console.log('ERROR')
        }

        counter++

      }
      repetitions.push(counter)
    }) 
    
    let result = 1
    for(let i = 0; i < repetitions.length; i++) {
      result = lcmFunction(result, repetitions[i])
    }

    return result.toString()
  }
}

function gcd(a: number, b: number) { 
  for (let temp = b; b !== 0;) { 
      b = a % b; 
      a = temp; 
      temp = b; 
  } 
  return a; 
} 

function lcmFunction(a: number , b: number) { 
  const gcdValue = gcd(a, b); 
  return (a * b) / gcdValue; 
} 

export default new Day8()
