import { Day } from '../day'
import { breadthFirstSearch, parseAndExpandInput } from './functions'
import { Galaxy } from './models'

class Day11 extends Day {
  constructor () {
    super(11)
  }

  solveForPartOne (input: string): string {
    const universe = parseAndExpandInput(input)
    const galaxies: Galaxy[] = []

    for (let y = 0; y < universe.length; y++) {
      for (let x = 0; x < universe[0].length; x++) {
        if (universe[y][x] === '#') {
          galaxies.push({
            x,
            y
          })
        }
      }
    }

    let sum = 0
    for (let i = 0; i < galaxies.length; i++) {
      for (let j = 0; j < galaxies.length; j++) {
        if (i === j || j < i) {
          continue
        }

        const startingX = galaxies[i].x
        const startingY = galaxies[i].y
        const endX = galaxies[j].x
        const endY = galaxies[j].y
        const distance = breadthFirstSearch(universe, startingX, startingY, endX, endY, 2)
        sum += distance
      }
    }

    return sum.toString()
  }

  solveForPartTwo (input: string): string {
    const universe = parseAndExpandInput(input)
    const galaxies: Galaxy[] = []

    for (let y = 0; y < universe.length; y++) {
      for (let x = 0; x < universe[0].length; x++) {
        if (universe[y][x] === '#') {
          galaxies.push({
            x,
            y
          })
        }
      }
    }

    let sum = 0
    for (let i = 0; i < galaxies.length; i++) {
      for (let j = 0; j < galaxies.length; j++) {
        if (i === j || j < i) {
          continue
        }

        const startingX = galaxies[i].x
        const startingY = galaxies[i].y
        const endX = galaxies[j].x
        const endY = galaxies[j].y
        const distance = breadthFirstSearch(universe, startingX, startingY, endX, endY, 1000000)
        sum += distance
      }
    }
    return sum.toString()
  }
}

export default new Day11()
