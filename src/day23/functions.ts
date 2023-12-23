import { neighborExists } from '../helpers/array'
import { directions } from '../helpers/directions'

export const breadthFirstSearch = (grid: string[][], startingX: number, startingY: number, endX: number, endY: number): number => {
  const queue = []
  queue.push({
    x: startingX,
    y: startingY,
    distance: 0,
    visited: Array.from(Array(grid.length), () => Array(grid[0].length).fill(false))
  })

  const destinations = []
  while (queue.length > 0) {
    // console.log(queue)

    const { x, y, distance, visited } = queue.shift()!
    const thisVisited = JSON.parse(JSON.stringify(visited))

    if (y === endY && x === endX) {
      destinations.push(distance)
    }

    directions.forEach(direction => {
      const neighborY = y + direction.y
      const neighborX = x + direction.x

      if ((grid[y][x] === '^' && direction.y !== -1) ||
                (grid[y][x] === '>' && direction.x !== 1) ||
                (grid[y][x] === 'v' && direction.y !== 1) ||
                (grid[y][x] === '<' && direction.x !== -1)) {
        return
      }

      if (neighborExists(grid[0].length, grid.length, neighborY, neighborX) && !thisVisited[neighborY][neighborX]) {
        thisVisited[neighborY][neighborX] = true
        if (grid[neighborY][neighborX] !== '#') {
          queue.push({ x: neighborX, y: neighborY, distance: distance + 1, visited: thisVisited })
        }
      }
    })
  }

  // console.log(destinations)
  return destinations.sort((a, b) => b - a)[0]
}

export const depthFirstSearchOnCrossings = (grid: string[][], startingX: number, startingY: number, endX: number, endY: number): number => {
  const crossings: Array<{
    x: number
    y: number
    connections?: Array<{
      x: number
      y: number
      distance?: number
    }>
    visited?: boolean
  }> = []
  crossings.push({
    x: startingX,
    y: startingY,
    connections: []
  })

  const queue = []
  queue.push({
    x: startingX,
    y: startingY,
    distance: 0
  })
  const visited = Array.from(Array(grid.length), () => Array(grid[0].length).fill(false))

  // bfs to find all crossings
  while (queue.length > 0) {
    const { x, y, distance } = queue.shift()!

    if (y === endY && x === endX) {
      break
    }

    const crossingExist = crossings.find(crossing => crossing.x === x && crossing.y === y)
    let countPossibleWays = 0
    directions.forEach(direction => {
      const neighborY = y + direction.y
      const neighborX = x + direction.x

      if (neighborExists(grid[0].length, grid.length, neighborY, neighborX) && grid[neighborY][neighborX] !== '#') {
        countPossibleWays++
      }

      if (neighborExists(grid[0].length, grid.length, neighborY, neighborX) && !visited[neighborY][neighborX]) {
        visited[neighborY][neighborX] = true
        if (grid[neighborY][neighborX] !== '#') {
          queue.push({ x: neighborX, y: neighborY, distance: distance + 1 })
        }
      }
    })
    if (crossingExist === undefined && countPossibleWays > 2) {
      crossings.push({
        x,
        y,
        connections: []
      })
    }
  }

  crossings.push({
    x: endX,
    y: endY,
    connections: []
  })

  // add connections for all crossings
  crossings.forEach(crossing => {
    directions.forEach(direction => {
      const neighborY = crossing.y + direction.y
      const neighborX = crossing.x + direction.x

      if (neighborExists(grid[0].length, grid.length, neighborY, neighborX) && grid[neighborY][neighborX] !== '#') {
        const localQueue = []
        localQueue.push({
          x: neighborX,
          y: neighborY,
          distance: 1
        })
        const localVisited = Array.from(Array(grid.length), () => Array(grid[0].length).fill(false))
        localVisited[crossing.y][crossing.x] = true
        localVisited[neighborY][neighborX] = true

        // direction to apply depthSearch from
        while (localQueue.length > 0) {
          const { x: innerX, y: innerY, distance } = localQueue.pop()!

          const thisCrossing = crossings.find(elem => elem.x === innerX && elem.y === innerY)
          if (thisCrossing !== undefined) {
            thisCrossing.connections?.push({
              x: crossing.x,
              y: crossing.y,
              distance
            })
            break
          } else {
            directions.forEach(direction => {
              const innerNeighborY = innerY + direction.y
              const innerNeighborX = innerX + direction.x

              if (neighborExists(grid[0].length, grid.length, innerNeighborY, innerNeighborX) && !localVisited[innerNeighborY][innerNeighborX]) {
                localVisited[innerNeighborY][innerNeighborX] = true
                if (grid[innerNeighborY][innerNeighborX] !== '#') {
                  localQueue.push({ x: innerNeighborX, y: innerNeighborY, distance: distance + 1 })
                }
              }
            })
          }
        }
      }
    })
  })

  // traverse only through crossings
  const results = []
  const crossingQueue = []
  crossings.forEach(crossing => crossing.visited = false)
  crossingQueue.push({
    crossing: crossings[0],
    distance: 0,
    visited: Array.from(Array(crossings.length), () => false)
  })

  while (crossingQueue.length > 0) {
    const currentCrossing = crossingQueue.pop()!
    const currentCrossingElement = crossings.find(elem => elem.x === currentCrossing.crossing.x && elem.y === currentCrossing.crossing.y)
    const index = crossings.findIndex(elem => elem.x === currentCrossing.crossing.x && elem.y === currentCrossing.crossing.y)
    const localVisited = JSON.parse(JSON.stringify(currentCrossing.visited))
    localVisited[index] = true

    if (currentCrossing.crossing.x === endX && currentCrossing.crossing.y === endY) {
      results.push(currentCrossing.distance)
      // console.log('New distance: ', currentCrossing.distance, '; highest: ', results.sort((a, b) => b - a)[0])
    }

    currentCrossingElement?.connections?.forEach(connection => {
      const j = crossings.findIndex(elem => elem.x === connection.x && elem.y === connection.y)
      if (!localVisited[j]) {
        crossingQueue.push({
          crossing: connection,
          distance: currentCrossing.distance + (connection.distance ?? 0),
          visited: localVisited
        })
      }
    })
  }

  return results.sort((a, b) => b - a)[0]
}
