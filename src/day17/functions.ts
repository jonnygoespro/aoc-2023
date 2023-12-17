import { neighborExists } from '../helpers/array'
import { directions } from '../helpers/directions'

export const dijkstra = (graph: number[][], startX: number, startY: number): Array<Array<{
  left: number[]
  right: number[]
  top: number[]
  bottom: number[]
}>> => {
  const width = graph[0].length
  const height = graph.length

  const queue: Node[] = []
  const distances = graph.map(row => row.map(_ => ({
    left: [Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE],
    right: [Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE],
    top: [Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE],
    bottom: [Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE]
  })))
  distances[startY][startX].left[0] = 0
  distances[startY][startX].right[0] = 0
  distances[startY][startX].top[0] = 0
  distances[startY][startX].bottom[0] = 0
  queue.push({ x: 1, y: 0, distance: graph[0][1], amountStraight: 1, direction: 'right' })
  distances[0][1].right[0] = graph[0][1]
  queue.push({ x: 0, y: 1, distance: graph[1][0], amountStraight: 1, direction: 'bottom' })
  distances[1][0].bottom[0] = graph[1][0]

  while (queue.length > 0) {
    const node = queue.shift()!

    directions.forEach(direction => {
      const neighborY = node.y + direction.y
      const neighborX = node.x + direction.x
      if (neighborExists(width, height, neighborY, neighborX)) {
        let newDirection: 'left' | 'top' | 'bottom' | 'right' = node.direction
        let newAmountStraight = 1
        if (direction.x === 1) { // right
          newDirection = 'right'
        } else if (direction.x === -1) { // left
          newDirection = 'left'
        } else if (direction.y === 1) { // bottom
          newDirection = 'bottom'
        } else if (direction.y === -1) { // top
          newDirection = 'top'
        }

        if (newDirection === node.direction) {
          newAmountStraight = node.amountStraight + 1
        }

        if (distances[neighborY][neighborX][newDirection][newAmountStraight - 1] > node.distance + graph[neighborY][neighborX] && newAmountStraight < 4) {
          if (!(direction.x === 1 && node.direction === 'left') && !(direction.x === -1 && node.direction === 'right') && !(direction.y === 1 && node.direction === 'top') && !(direction.y === -1 && node.direction === 'bottom')) {
            queue.push({
              x: neighborX,
              y: neighborY,
              distance: node.distance + graph[neighborY][neighborX],
              amountStraight: newAmountStraight,
              direction: newDirection
            })
            if (distances[neighborY][neighborX][newDirection][newAmountStraight - 1] >= node.distance + graph[neighborY][neighborX]) {
              distances[neighborY][neighborX][newDirection][newAmountStraight - 1] = node.distance + graph[neighborY][neighborX]
            }
          }
        }
      }
    })

    queue.sort((a, b) => a.distance - b.distance)

    if (node.x === width - 1 && node.y === height - 1) {
      break
    }
  }

  return distances
}

interface Node {
  x: number
  y: number
  distance: number
  amountStraight: number
  direction: 'left' | 'top' | 'bottom' | 'right'
}
