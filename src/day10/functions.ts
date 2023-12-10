import { neighborExists } from '../helpers/array'
import { directions } from '../helpers/directions'
import { mapping, Direction } from './models'

export const extractLoopFromMaze = (maze: string[][]): string[][] => {
  const cleanedMaze: string[][] = maze.map(line => line.map(_ => ''))
  let [y, x] = getStaringPosition(maze)
  const startingPipe = getPipeOfStartingPosition(x, y, maze)
  const visitedNodes: Set<string> = new Set()

  while (true) {
    cleanedMaze[y][x] = maze[y][x]
    visitedNodes.add([x, y].join(','));
    [x, y] = findNextPipeCoordinates(x, y, maze, visitedNodes, startingPipe)

    if (visitedNodes.has([x, y].join(','))) {
      break
    }
  }

  return cleanedMaze
}

const getStaringPosition = (maze: string[][]): [number, number] => {
  const startingY = maze.findIndex((line) => line.includes('S'))
  const startingX = maze[startingY].findIndex((element) => element === 'S')
  return [startingY, startingX]
}

export const getPipeOfStartingPosition = (x: number, y: number, maze: string[][]): string => {
  const isNorthConnected = y > 0 && ['F', '7', '|'].includes(maze[y - 1][x])
  const isSouthConnected = y < maze.length - 1 && ['L', 'J', '|'].includes(maze[y + 1][x])
  const isWestConnected = x > 0 && ['L', 'F', '-'].includes(maze[y][x - 1])
  const isEastConnected = x < maze[0].length - 1 && ['J', '7', '-'].includes(maze[y][x + 1])

  return isNorthConnected && isSouthConnected && !isEastConnected && !isWestConnected
    ? '|'
    : !isNorthConnected && !isSouthConnected && isEastConnected && isWestConnected
        ? '-'
        : !isNorthConnected && isSouthConnected && !isEastConnected && isWestConnected
            ? '7'
            : !isNorthConnected && isSouthConnected && isEastConnected && !isWestConnected
                ? 'F'
                : isNorthConnected && !isSouthConnected && !isEastConnected && isWestConnected
                  ? 'J'
                  : isNorthConnected && !isSouthConnected && isEastConnected && !isWestConnected
                    ? 'L'
                    : (() => { throw Error('Unknown start position') })()
}

const findNextPipeCoordinates = (x: number, y: number, maze: string[][], visitedNodes: Set<string>, startingPipe: string): [number, number] => {
  const pipe = (visitedNodes.size === 1) ? startingPipe : maze[y][x]
  const directions: Record<Direction, number> = mapping[pipe]

  for (const [direction, step] of Object.entries(directions)) {
    if (step !== 0 && isValidMove(maze, x, y, direction as Direction, step, visitedNodes)) {
      const newX = x + (direction === 'east' ? step : (direction === 'west' ? step : 0))
      const newY = y + (direction === 'south' ? step : (direction === 'north' ? step : 0))
      return [newX, newY]
    }
  }

  return [x, y]
}

const isValidMove = (maze: string[][], x: number, y: number, direction: Direction, step: number, visitedNodes: Set<string>): boolean => {
  const newX = x + (direction === 'east' ? step : (direction === 'west' ? step : 0))
  const newY = y + (direction === 'south' ? step : (direction === 'north' ? step : 0))
  return maze[newY]?.[newX] !== '' && !visitedNodes.has([newX, newY].join(','))
}

export const scaleMaze = (maze: string[][]): string[][] => {
  const [startingY, startingX] = getStaringPosition(maze)
  const startingPipe = getPipeOfStartingPosition(startingX, startingY, maze)

  const newMaze: string[][] = Array.from({ length: maze.length * 2 - 1 }, () => Array(maze[0].length * 2 - 1).fill(''))

  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[0].length; x++) {
      newMaze[y * 2][x * 2] = (x === startingX && y === startingY) ? startingPipe : maze[y][x]
    }
  }

  for (let y = 0; y < newMaze.length; y++) {
    for (let x = 0; x < newMaze[0].length; x++) {
      if (newMaze[y][x] === '') {
        for (const [pipe, conditions] of Object.entries(pipeConditions)) {
          if (conditions.every(cond => cond(y, x, newMaze))) {
            newMaze[y][x] = pipe
            break
          }
        }
      }
    }
  }

  return newMaze
}

const pipeConditions: Record<string, Array<(y: number, x: number, maze: string[][]) => boolean>> = {
  '|': [
    (y, x, maze) => y - 1 >= 0 && ['7', '|', 'F'].includes(maze[y - 1][x]),
    (y, x, maze) => y + 1 < maze.length && ['J', '|', 'L'].includes(maze[y + 1][x])
  ],
  '-': [
    (y, x, maze) => x - 1 >= 0 && ['L', '-', 'F'].includes(maze[y][x - 1]),
    (y, x, maze) => x + 1 < maze[0].length && ['J', '-', '7'].includes(maze[y][x + 1])
  ],
  7: [
    (y, x, maze) => x - 1 >= 0 && ['L', '-', 'F'].includes(maze[y][x - 1]),
    (y, x, maze) => y + 1 < maze.length && ['J', '|', 'L'].includes(maze[y + 1][x])
  ],
  F: [
    (y, x, maze) => x + 1 < maze[0].length && ['J', '-', '7'].includes(maze[y][x + 1]),
    (y, x, maze) => y + 1 < maze.length && ['J', '|', 'L'].includes(maze[y + 1][x])
  ],
  J: [
    (y, x, maze) => x - 1 >= 0 && ['L', '-', 'F'].includes(maze[y][x - 1]),
    (y, x, maze) => y - 1 >= 0 && ['7', '|', 'F'].includes(maze[y - 1][x])
  ],
  L: [
    (y, x, maze) => y - 1 >= 0 && ['7', '|', 'F'].includes(maze[y - 1][x]),
    (y, x, maze) => x + 1 < maze[0].length && ['J', '-', '7'].includes(maze[y][x + 1])
  ]
}

export const fillMaze = (maze: string[][]): string[][] => {
  const startingPoints = []
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[0].length; x++) {
      if ((x === 0 || x === maze[0].length - 1 || y === 0 || y === maze.length - 1) && maze[y][x] === '') {
        maze[y][x] = 'O'
        startingPoints.push({ x, y })
      }
    }
  }

  let pointsToLookAt = startingPoints
  while (pointsToLookAt.length > 0) {
    pointsToLookAt = visitAndMarkNeighbours(maze, pointsToLookAt)
  }

  return maze
}

const visitAndMarkNeighbours = (maze: string[][], pointsToLookAt: Array<{ x: number, y: number }>): Array<{ x: number, y: number }> => {
  const x = pointsToLookAt[0].x
  const y = pointsToLookAt[0].y
  directions.forEach(direction => {
    const neighborY = y + direction.y
    const neighborX = x + direction.x
    if (neighborExists(maze[0].length, maze.length, neighborY, neighborX) && maze[neighborY][neighborX] === '') {
      maze[neighborY][neighborX] = 'O'
      pointsToLookAt.push({
        x: neighborX,
        y: neighborY
      })
    }
  })

  pointsToLookAt.shift()
  return pointsToLookAt
}
