import { Day } from '../day'

class Day15 extends Day {
  constructor () {
    super(15)
  }

  solveForPartOne (input: string): string {
    const result = input.split(',').map(sequence => hash(sequence)).reduce((prev, curr) => prev + curr, 0)
    return result.toString()
  }

  solveForPartTwo (input: string): string {
    const boxes: any[][] = Array.from({ length: 256 }, () => [])

    input.split(',').forEach(sequence => {
      const operation = (sequence.includes('-')) ? '-' : '='
      const [label, number] = sequence.split(operation)
      const boxIndex = hash(label)
      const slot = boxes[boxIndex].findIndex((elem) => elem.label === label)

      if (operation === '=') {
        if (slot !== -1) {
          boxes[boxIndex][slot].number = Number(number)
        } else {
          boxes[boxIndex].push({
            label,
            number: Number(number)
          })
        }
      } else {
        if (slot !== -1) {
          boxes[boxIndex].splice(slot, 1)
        }
      }
    })

    const result = boxes.map((box, index) => box.reduce((prev: number, lense, slot) => prev + ((1 + index) * (slot + 1) * lense.number), 0)).reduce((prev, curr) => prev + curr, 0)
    return result.toString()
  }
}

export default new Day15()

const hash = (string: string): number => {
  let sum = 0
  string.split('').forEach(char => {
    const asciCode = char.charCodeAt(0)
    sum = ((sum + asciCode) * 17) % 256
  })
  return sum
}
