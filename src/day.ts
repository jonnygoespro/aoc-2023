import fs from 'fs'

abstract class Day {
  id: number

  constructor (id: number) {
    this.id = id
  }

  async testInputPartOne (): Promise<string> {
    const content = await fs.promises.readFile(`./inputs/day${this.id}/test.txt`)
    const result = this.solveForPartOne(content.toString())
    return result
  }

  async partOne (): Promise<string> {
    const content = await fs.promises.readFile(`./inputs/day${this.id}/input.txt`)
    const result = this.solveForPartOne(content.toString())
    return result
  }

  abstract solveForPartOne (input: string): string

  async testInputPartTwo (): Promise<string> {
    const content = await fs.promises.readFile(`./inputs/day${this.id}/test.txt`)
    const result = this.solveForPartTwo(content.toString())
    return result
  }

  async partTwo (): Promise<string> {
    const content = await fs.promises.readFile(`./inputs/day${this.id}/input.txt`)
    const result = this.solveForPartTwo(content.toString())
    return result
  }

  abstract solveForPartTwo (input: string): string
}

export { Day }
