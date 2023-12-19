import fs, { opendir } from 'fs'

export interface Part {
  x: number
  m: number
  a: number
  s: number
}

interface InstructionChain {
  name: string
  instructions: Instruction[]
}

interface Instruction {
  name?: string
  element?: string
  operation?: '>' | '<' | ''
  amount?: number
  destination?: string
  instructions?: Instruction[]
}

export const parseInput = (input: string): [InstructionChain[], Part[]] => {
  const [instructionsBlock, partsBlock] = input.split('\n\n')

  // parse parts
  const parts: Part[] = []
  partsBlock.split('\n').forEach(part => {
    const matches = part.match(/\w+=\d+/g)
    const cleanedMatches = matches!.map(match => match.slice(2))
    parts.push({
      x: Number(cleanedMatches[0]),
      m: Number(cleanedMatches[1]),
      a: Number(cleanedMatches[2]),
      s: Number(cleanedMatches[3])
    })
  })

  // parse instructions
  const instructionChains: InstructionChain[] = []
  instructionsBlock.split('\n').forEach(instruction => {
    const match = instruction.match(/^(\w+){(.+)}$/)!
    const name = match[1]
    const instructionsStr = match[2]
    const instructions = instructionsStr.split(',').map(instructionStr => {
      const match = instructionStr.match(/^(\w+)([<>]?)(\d+)?(?:\:(\w+))?$/)!
      const [, element, operation, amountStr, destination] = match
      const amount = Number(amountStr)

      return { element, operation: operation as '>' | '<' | '', amount, destination }
    })

    instructionChains.push({
      name,
      instructions
    })
  })

  return [instructionChains, parts]
}

export const executePart = (part: Part, instructionChains: InstructionChain[]): boolean => {
  let nextChain = instructionChains.find(chain => chain.name === 'in')!
  let end = false
  let result = ''

  while (!end && nextChain !== undefined) {
    // console.log('next chain: ', nextChain)
    for (let i = 0; i < nextChain.instructions.length; i++) {
      const instruction = nextChain.instructions[i]
      if (instruction.operation === '') {
        if (instruction.element === 'A' || instruction.element === 'R') {
          end = true
          result = instruction.element
        } else {
          nextChain = instructionChains.find(chain => chain.name === instruction.element)!
          break
        }
      }

      const number = part[instruction.element as 'x' | 'm' | 'a' | 's']
      if ((instruction.operation === '>' && number > instruction.amount!) || (instruction.operation === '<' && number < instruction.amount!)) {
        if (instruction.destination === 'A' || instruction.destination === 'R') {
          end = true
          result = instruction.destination
        } else {
          nextChain = instructionChains.find(chain => chain.name === instruction.destination)!
        }
        break
      }
    }
  }
  return result === 'A'
}

export const buildTree = (chains: InstructionChain[]): Instruction => {
  const firstChain = chains.find(chain => chain.name === 'in')!

  const root: Instruction = {
    name: firstChain.name,
    instructions: []
  }

  firstChain.instructions.forEach((instruction, index) => {
    addInstructions(root, instruction, `${firstChain.name}${index}`, chains)
  })

  // console.log(root)
  // try {
  //     fs.writeFileSync('./test.json', JSON.stringify(root))
  // } catch (err) {
  //     console.error(err)
  // }
  return root
}

const addInstructions = (node: Instruction, instruction: Instruction, name: string, chains: InstructionChain[]) => {
  let newLength = 0
  if (instruction.element !== 'A') {
    newLength = node.instructions?.push({
      ...instruction,
      name,
      instructions: []
    })!
  } else {
    // console.log(node)
    node.instructions?.slice(0).forEach((instruction, index) => {
      newLength = node.instructions?.push({
        ...instruction,
        element: instruction.element,
        destination: 'A',
        operation: (instruction.operation === '>') ? '<' : '>',
        amount: (instruction.operation === '>') ? instruction.amount! + 1 : instruction.amount! - 1,
        name: `${name}${index}`,
        instructions: []
      })!
    })
  }

  if (instruction.destination !== undefined) {
    const nextChain = chains.find(chain => chain.name === instruction.destination)
    if (nextChain !== undefined) {
      nextChain.instructions.forEach((instruction, index) => {
        addInstructions(node.instructions![newLength - 1], instruction, `${nextChain.name}${index}`, chains)
      })
    }
  } else if (instruction.operation === '' && instruction.element !== 'A' && instruction.element !== 'R') {
    const nextChain = chains.find(chain => chain.name === instruction.element)
    if (nextChain !== undefined) {
      nextChain.instructions.forEach((instruction, index) => {
        addInstructions(node.instructions![newLength - 1], instruction, `${nextChain.name}${index}`, chains)
      })
    }
  }
}

export const countPossibilities = (instructions: Instruction[], minX: number, maxX: number, minM: number, maxM: number, minA: number, maxA: number, minS: number, maxS: number, ranges: Range[][]): Range[][] => {
  instructions.forEach(instruction => {
    if (instruction.instructions !== undefined && instruction.instructions.length > 0) {
      let localMinX = minX
      let localMaxX = maxX
      let localMinM = minM
      let localMaxM = maxM
      let localMinA = minA
      let localMaxA = maxA
      let localMinS = minS
      let localMaxS = maxS

      if (instruction.element === 'x' || instruction.element === 'm' || instruction.element === 'a' || instruction.element === 's') {
        ({ localMinX, localMaxX, localMinM, localMaxM, localMinA, localMaxA, localMinS, localMaxS } = calculateBounds(instruction, localMinX, localMaxX, localMinM, localMaxM, localMinA, localMaxA, localMinS, localMaxS))

        // PLEASE SEND HELP
        let index = instructions.findIndex(val => val.name === instruction.name)!
        while (index > 0) {
          index--
          const thisInstruction = instructions[index];

          ({ localMinX, localMaxX, localMinM, localMaxM, localMinA, localMaxA, localMinS, localMaxS } = calculateInvertedBounds(thisInstruction, localMinX, localMaxX, localMinM, localMaxM, localMinA, localMaxA, localMinS, localMaxS))
        }
        // DONE

        if (instruction.instructions.length > 0) {
          countPossibilities(instruction.instructions, localMinX, localMaxX, localMinM, localMaxM, localMinA, localMaxA, localMinS, localMaxS, ranges)
        }
      } else {
        let index = instructions.findIndex(val => val.name === instruction.name)!
        while (index > 0) {
          index--
          const thisInstruction = instructions[index];

          ({ localMinX, localMaxX, localMinM, localMaxM, localMinA, localMaxA, localMinS, localMaxS } = calculateInvertedBounds(thisInstruction, localMinX, localMaxX, localMinM, localMaxM, localMinA, localMaxA, localMinS, localMaxS))
        }

        if (instruction.instructions.length > 0) {
          countPossibilities(instruction.instructions, localMinX, localMaxX, localMinM, localMaxM, localMinA, localMaxA, localMinS, localMaxS, ranges)
        }
      }
    }
    if (instruction.destination === 'A') {
      let localMinX = minX
      let localMaxX = maxX
      let localMinM = minM
      let localMaxM = maxM
      let localMinA = minA
      let localMaxA = maxA
      let localMinS = minS
      let localMaxS = maxS;

      ({ localMinX, localMaxX, localMinM, localMaxM, localMinA, localMaxA, localMinS, localMaxS } = calculateBounds(instruction, localMinX, localMaxX, localMinM, localMaxM, localMinA, localMaxA, localMinS, localMaxS))

      let index = instructions.findIndex(val => val.name === instruction.name)!
      while (index > 0) {
        index--
        const thisInstruction = instructions[index];

        ({ localMinX, localMaxX, localMinM, localMaxM, localMinA, localMaxA, localMinS, localMaxS } = calculateInvertedBounds(thisInstruction, localMinX, localMaxX, localMinM, localMaxM, localMinA, localMaxA, localMinS, localMaxS))
      }

      ranges.push([
        {
          symbol: 'x',
          from: localMinX,
          to: localMaxX
        },
        {
          symbol: 'm',
          from: localMinM,
          to: localMaxM
        },
        {
          symbol: 'a',
          from: localMinA,
          to: localMaxA
        },
        {
          symbol: 's',
          from: localMinS,
          to: localMaxS
        }
      ])
    }
  })

  return ranges
}

export interface Range {
  symbol: string
  from: number
  to: number
}

const calculateBounds = (instruction: Instruction, localMinX: number, localMaxX: number, localMinM: number, localMaxM: number, localMinA: number, localMaxA: number, localMinS: number, localMaxS: number) => {
  switch (instruction.element) {
    case 'x':
      if (instruction.operation === '>') {
        localMinX = (instruction.amount! > localMinX) ? instruction.amount! + 1 : localMinX
      } else {
        localMaxX = (instruction.amount! < localMaxX) ? instruction.amount! - 1 : localMaxX
      }
      break
    case 'm':
      if (instruction.operation === '>') {
        localMinM = (instruction.amount! > localMinM) ? instruction.amount! + 1 : localMinM
      } else {
        localMaxM = (instruction.amount! < localMaxM) ? instruction.amount! - 1 : localMaxM
      }
      break
    case 'a':
      if (instruction.operation === '>') {
        localMinA = (instruction.amount! > localMinA) ? instruction.amount! + 1 : localMinA
      } else {
        localMaxA = (instruction.amount! < localMaxA) ? instruction.amount! - 1 : localMaxA
      }
      break
    case 's':
      if (instruction.operation === '>') {
        localMinS = (instruction.amount! > localMinS) ? instruction.amount! + 1 : localMinS
      } else {
        localMaxS = (instruction.amount! < localMaxS) ? instruction.amount! - 1 : localMaxS
      }
      break
  }
  return { localMinX, localMaxX, localMinM, localMaxM, localMinA, localMaxA, localMinS, localMaxS }
}

const calculateInvertedBounds = (instruction: Instruction, localMinX: number, localMaxX: number, localMinM: number, localMaxM: number, localMinA: number, localMaxA: number, localMinS: number, localMaxS: number) => {
  switch (instruction.element) {
    case 'x':
      if (instruction.operation === '>') {
        localMaxX = (instruction.amount! < localMaxX) ? instruction.amount! : localMaxX
      } else {
        localMinX = (instruction.amount! > localMinX) ? instruction.amount! : localMinX
      }
      break
    case 'm':
      if (instruction.operation === '>') {
        localMaxM = (instruction.amount! < localMaxM) ? instruction.amount! : localMaxM
      } else {
        localMinM = (instruction.amount! > localMinM) ? instruction.amount! : localMinM
      }
      break
    case 'a':
      if (instruction.operation === '>') {
        localMaxA = (instruction.amount! < localMaxA) ? instruction.amount! : localMaxA
      } else {
        localMinA = (instruction.amount! > localMinA) ? instruction.amount! : localMinA
      }
      break
    case 's':
      if (instruction.operation === '>') {
        localMaxS = (instruction.amount! < localMaxS) ? instruction.amount! : localMaxS
      } else {
        localMinS = (instruction.amount! > localMinS) ? instruction.amount! : localMinS
      }
      break
  }
  return { localMinX, localMaxX, localMinM, localMaxM, localMinA, localMaxA, localMinS, localMaxS }
}
