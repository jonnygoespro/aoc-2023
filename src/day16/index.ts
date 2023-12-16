import { Day } from '../day'
import { create2dArray } from '../helpers/array'
import { executePassThrough, executeRightMirror, executeLeftMirror, executeHorizontalSplitter, executeVerticalSplitter } from './functions'
import { Node, VisitedDirections } from './models'

class Day16 extends Day {
  constructor () {
    super(16)
  }

  solveForPartOne (input: string): string {
    const map = create2dArray(input)
    const visitedMap: VisitedDirections[][] = map.map(row => row.map(_ => ({
      fromLeft: false,
      fromRight: false,
      fromTop: false,
      fromBottom: false
    })))

    const queue: Node[] = [{
      x: 0,
      y: 0,
      previous: {
        x: -1,
        y: 0
      }
    }]
    visitedMap[0][0].fromLeft = true

    while (queue.length > 0) {
      const node = queue.shift()!

      switch (map[node.y][node.x]) {
        case '.':
          executePassThrough(node, visitedMap, queue)
          break
        case '/':
          executeRightMirror(node, visitedMap, queue)
          break
        case '\\':
          executeLeftMirror(node, visitedMap, queue)
          break
        case '-':
          executeHorizontalSplitter(node, visitedMap, queue)
          break
        case '|':
          executeVerticalSplitter(node, visitedMap, queue)
          break
      }
    }

    return visitedMap.flat().filter(elem => elem.fromBottom || elem.fromTop || elem.fromLeft || elem.fromRight).length.toString()
  }

  solveForPartTwo (input: string): string {
    const map = create2dArray(input)
    const startingPoints: Node[] = []
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if ((x === 0 || x === map[0].length - 1 || y === 0 || y === map.length - 1)) {
          if (x === 0) {
            startingPoints.push({
              x,
              y,
              previous: {
                x: x - 1,
                y
              }
            })
          }
          if (x === map[0].length - 1) {
            startingPoints.push({
              x,
              y,
              previous: {
                x: x + 1,
                y
              }
            })
          }
          if (y === 0) {
            startingPoints.push({
              x,
              y,
              previous: {
                x,
                y: y - 1
              }
            })
          }
          if (y === map.length - 1) {
            startingPoints.push({
              x,
              y,
              previous: {
                x,
                y: y + 1
              }
            })
          }
        }
      }
    }
    const results: number[] = []

    startingPoints.forEach(startingPoint => {
      const visitedMap: VisitedDirections[][] = map.map(row => row.map(_ => ({
        fromLeft: false,
        fromRight: false,
        fromTop: false,
        fromBottom: false
      })))

      const queue: Node[] = [startingPoint]

      if (startingPoint.x === 0) {
        visitedMap[startingPoint.y][startingPoint.x].fromTop = true
      } else if (startingPoint.x === map[0].length - 1) {
        visitedMap[startingPoint.y][startingPoint.x].fromBottom = true
      } else if (startingPoint.y === 0) {
        visitedMap[startingPoint.y][startingPoint.x].fromLeft = true
      } else if (startingPoint.y === map.length - 1) {
        visitedMap[startingPoint.y][startingPoint.x].fromRight = true
      }

      while (queue.length > 0) {
        const node = queue.shift()!

        switch (map[node.y][node.x]) {
          case '.':
            executePassThrough(node, visitedMap, queue)
            break
          case '/':
            executeRightMirror(node, visitedMap, queue)
            break
          case '\\':
            executeLeftMirror(node, visitedMap, queue)
            break
          case '-':
            executeHorizontalSplitter(node, visitedMap, queue)
            break
          case '|':
            executeVerticalSplitter(node, visitedMap, queue)
            break
        }
      }

      const result = visitedMap.flat().filter(elem => elem.fromBottom || elem.fromTop || elem.fromLeft || elem.fromRight).length
      results.push(result)
    })

    return results.sort((a, b) => b - a)[0].toString()
  }
}

export default new Day16()
