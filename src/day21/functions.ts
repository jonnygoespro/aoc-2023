import { neighborExists } from '../helpers/array'
import { directions } from '../helpers/directions'

export const breadthFirstSearch = (grid: string[][], amountSteps: number): number => {
  const startingY = grid.findIndex(row => row.includes('S'))
  const startingX = grid[startingY].findIndex(element => element === 'S')

  const queue = []
  queue.push({ x: startingX, y: startingY, steps: 0 })

  const combinations: string[] = []
  while (!queue.every(value => value.steps === amountSteps)) {
    const { x, y, steps } = queue.shift()!

    directions.forEach(direction => {
      const neighborY = y + direction.y
      const neighborX = x + direction.x

      if (neighborExists(grid[0].length, grid.length, neighborY, neighborX) && grid[neighborY][neighborX] !== '#' && !combinations.includes(`${neighborY},${neighborX},${steps + 1}`)) {
        combinations.push(`${neighborY},${neighborX},${steps + 1}`)
        queue.push({ x: neighborX, y: neighborY, steps: steps + 1 })
      }
    })
  }

  return queue.length
}

export const calculateFirstThreeFunctionParameters = (grid: string[][]): number[] => {
  const startingY = grid.findIndex(row => row.includes('S'))
  const startingX = grid[startingY].findIndex(element => element === 'S')

  const results: number[] = []
  let previousStates: Set<string> = new Set([`${startingY},${startingX},0,0,0`])

  for (let i = 1; i <= 327; i++) {
    const states: Set<string> = new Set()

    previousStates.forEach(node => {
      const [y, x, steps, mapY, mapX] = node.split(',').map(Number)

      directions.forEach(direction => {
        const neighborY = (y + direction.y + grid.length) % grid.length
        const neighborX = (x + direction.x + grid[0].length) % grid[0].length
        const neighborMapY = (y + direction.y) >= grid.length ? mapY + 1 : (y + direction.y) < 0 ? mapY - 1 : mapY
        const neighborMapX = (x + direction.x) >= grid[0].length ? mapX + 1 : (x + direction.x) < 0 ? mapX - 1 : mapX

        const combination = `${neighborY},${neighborX},${steps + 1},${neighborMapY},${neighborMapX}`
        if (grid[neighborY][neighborX] !== '#' && !states.has(combination)) {
          states.add(combination)
        }
      })
    })

    if (i === 65 || i === 196 || i === 327) {
      results.push(states.size)
    }
    previousStates = states
  }

  return results
}

export const f = (n: number, a: number, b: number, c: number): number => {
  return a + n * (b - a) + (n * (n - 1) * (c - b - (b - a))) / 2
}
