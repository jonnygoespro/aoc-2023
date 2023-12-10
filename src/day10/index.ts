import { Day } from '../day'
import { create2dArray, neighborExists } from '../helpers/array'
import { directions } from '../helpers/directions'
import { extractLoopFromMaze, getPipeOfStartingPosition } from './functions'

class Day10 extends Day {
  constructor() {
    super(10)
  }

  solveForPartOne(input: string): string {
    const maze = create2dArray(input)
    const mazeWithLoop = extractLoopFromMaze(maze)
    const result = mazeWithLoop.flat().filter(elem => elem !== '').length / 2
    return result.toString()
  }

  solveForPartTwo(input: string): string {
    const maze = create2dArray(input)
    const mazeWithLoop = extractLoopFromMaze(maze)
    const mazeWithLoopCopy = [...mazeWithLoop]

    const startingY = maze.findIndex((line) => line.includes('S'))
    const startingX = maze[startingY].findIndex((element) => element === 'S')
    const startingPipe = getPipeOfStartingPosition(startingX, startingY, maze)

    // create new maze
    let newMaze: string[][] = []
    for (let y = 0; y < (mazeWithLoop.length * 2) - 1; y++) {
      newMaze.push([])
    }

    for (let y = 0; y < newMaze.length; y++) {
      for (let x = 0; x < (mazeWithLoop[0].length * 2) - 1; x++) {
        newMaze[y].push('')
      }
    }

    for (let y = 0; y < newMaze.length; y++) {
      for (let x = 0; x < newMaze[0].length; x++) {
        if (x % 2 === 0 && y % 2 === 0) {
          newMaze[y][x] = mazeWithLoop[y/2][x/2]
        }
      }
    }

    newMaze[startingY*2][startingX*2] = startingPipe

    for (let y = 0; y < newMaze.length; y++) {
      for (let x = 0; x < newMaze[0].length; x++) {
        if (newMaze[y][x] === '') {
          // Pipe: |
          if ((y - 1 >= 0 && ['7', '|', 'F'].includes(newMaze[y-1][x])) && (y + 1 < newMaze.length && ['J', '|', 'L'].includes(newMaze[y+1][x]))) {
            newMaze[y][x] = '|'
          }

          // Pipe: -
          if ((x - 1 >= 0 && ['L', '-', 'F'].includes(newMaze[y][x-1])) && (x + 1 < newMaze[0].length && ['J', '-', '7'].includes(newMaze[y][x+1]))) {
            newMaze[y][x] = '-'
          }

          // Pipe: 7
          if ((x - 1 >= 0 && ['L', '-', 'F'].includes(newMaze[y][x-1])) && (y + 1 < newMaze.length && ['J', '|', 'L'].includes(newMaze[y+1][x]))) {
            newMaze[y][x] = '7'
          }

          // Pipe: F
          if ((x + 1 < newMaze[0].length && ['J', '-', '7'].includes(newMaze[y][x+1])) && (y + 1 < newMaze.length && ['J', '|', 'L'].includes(newMaze[y+1][x]))) {
            newMaze[y][x] = 'F'
          }

          // Pipe: J
          if ((x - 1 >= 0 && ['L', '-', 'F'].includes(newMaze[y][x-1])) && (y - 1 >= 0 && ['7', '|', 'F'].includes(newMaze[y-1][x]))) {
            newMaze[y][x] = 'J'
          }

          // Pipe: L
          if ((y - 1 >= 0 && ['7', '|', 'F'].includes(newMaze[y-1][x])) && (x + 1 < newMaze[0].length && ['J', '-', '7'].includes(newMaze[y][x+1]))) {
            newMaze[y][x] = 'L'
          }
        }
      }
    }

    // start von jedem randpunkt aus
    let startingPoints = []
    for (let y = 0; y < newMaze.length; y++) {
      for (let x = 0; x < newMaze[0].length; x++) {
        if (x === 0 || x === newMaze[0].length -1 || y === 0 || y === newMaze.length - 1) {
          if (newMaze[y][x] === '') {
            newMaze[y][x] = 'O'
            startingPoints.push({
              x: x,
              y: y
            })
          }
        }
      }
    }

    let pointsToLookAt = startingPoints
    while (pointsToLookAt.length > 0) {
      pointsToLookAt = visitAndMarkNeighbours(newMaze, pointsToLookAt)
    }
    
    // map back to maze
    for (let y = 0; y < mazeWithLoopCopy.length; y++) {
      for (let x = 0; x < mazeWithLoopCopy[0].length; x++) {
        mazeWithLoopCopy[y][x] = newMaze[y*2][x*2]
      }
    }

    const result = mazeWithLoopCopy.flat().filter(elem => elem === '').length
    return result.toString()
  }
}

const visitAndMarkNeighbours = (maze: string[][], pointsToLookAt: { x: number; y: number; }[]): { x: number; y: number; }[] => {
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

export default new Day10()
