import { Group } from './models'

export const parseInput = (input: string): Group[] => {
  const groups: Group[] = []

  input.split('\n').forEach(line => {
    const [conditionLine, instructionLine] = line.split(' ')
    const desiredAmount = instructionLine.split(',').map(char => Number(char)).reduce((prev, curr) => prev + curr, 0)
    // const knownAmount = conditionLine.split('').filter(char => char === '#').length
    groups.push({
      conditionLine,
      // instructions: instructionLine.split(',').map(char => Number(char)),
      desiredBlocks: instructionLine.split(',').map(char => Number(char)).map(number => Array.from(Array(number), () => '#').join('')),
      // conditionBlocks: conditionLine.split('.').filter(elem => elem !== ''),
      desiredAmount
      // // knownAmount: knownAmount,
      // // unknownAmount: conditionLine.split('').filter(char => char === '?').length,
      // // amountToAdd: desiredAmount - knownAmount
    })
  })

  return groups
}

export const expandRow = (row: Group): Group => {
  let newConditionLine = ''
  let newDesiredBlocks: string[] = []
  for (let i = 0; i < 5; i++) {
    newConditionLine += (i === 4) ? row.conditionLine : row.conditionLine + '?'
    newDesiredBlocks = [...newDesiredBlocks, ...row.desiredBlocks]
  }
  const newDesiredAmount = newDesiredBlocks.join('').split('').length

  return {
    conditionLine: newConditionLine,
    desiredBlocks: newDesiredBlocks,
    desiredAmount: newDesiredAmount
  }
}

export const calculatePossibilities = (row: Group): number => {
  const possibilities: string[] = []
  generateCombinations(row.conditionLine, '', 0, row.desiredAmount, row.desiredAmount, possibilities, row.desiredBlocks)

  return possibilities.filter(possibility => {
    const filteredPossibilities = getBlocks(possibility)
    return checkEquality(filteredPossibilities, row.desiredBlocks)
  }).length
}

const generateCombinations = (inputString: string, currentString: string, index: number, remainingAmount: number, desiredAmount: number, result: string[], desiredBlocks: string[]): void => {
  if (!isValid(getBlocks(currentString), desiredBlocks)) {
    return
  }

  if (index === inputString.length) {
    if (remainingAmount === 0) {
      result.push(currentString)
    }
    return
  }

  if (inputString[index] === '#') {
    generateCombinations(inputString, currentString + '#', index + 1, remainingAmount - 1, desiredAmount, result, desiredBlocks)
  } else if (inputString[index] === '?') {
    generateCombinations(inputString, currentString + '#', index + 1, remainingAmount - 1, desiredAmount, result, desiredBlocks)
    generateCombinations(inputString, currentString + '?', index + 1, remainingAmount, desiredAmount, result, desiredBlocks)
  } else {
    generateCombinations(inputString, currentString + inputString[index], index + 1, remainingAmount, desiredAmount, result, desiredBlocks)
  }
}

const checkEquality = (a: string[], b: string[]): boolean => {
  return a.length === b.length && a.every((v, i) => v === b[i])
}

const isValid = (a: string[], b: string[]): boolean => {
  return a.slice(0, -1).every((elem, i) => elem === b[i])
}

const getBlocks = (string: string): string[] => {
  return string.split('').map(elem => elem === '?' ? '.' : elem).join('').split('.').filter(elem => elem !== '')
}
