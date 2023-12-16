import { Node, VisitedDirections } from './models'

export const executePassThrough = (node: Node, visitedMap: VisitedDirections[][], queue: Node[]): void => {
  if (node.x > node.previous.x) { // direction right
    addRightNode(node, visitedMap, queue)
  } else if (node.x < node.previous.x) { // direction left
    addLeftNode(node, visitedMap, queue)
  } else if (node.y > node.previous.y) { // direction down
    addDownNode(node, visitedMap, queue)
  } else if (node.y < node.previous.y) { // direction up
    addTopNode(node, visitedMap, queue)
  }
}

export const executeRightMirror = (node: Node, visitedMap: VisitedDirections[][], queue: Node[]): void => {
  if (node.x > node.previous.x) { // direction right
    addTopNode(node, visitedMap, queue)
  } else if (node.x < node.previous.x) { // direction left
    addDownNode(node, visitedMap, queue)
  } else if (node.y > node.previous.y) { // direction down
    addLeftNode(node, visitedMap, queue)
  } else if (node.y < node.previous.y) { // direction up
    addRightNode(node, visitedMap, queue)
  }
}

export const executeLeftMirror = (node: Node, visitedMap: VisitedDirections[][], queue: Node[]): void => {
  if (node.x > node.previous.x) { // direction right
    addDownNode(node, visitedMap, queue)
  } else if (node.x < node.previous.x) { // direction left
    addTopNode(node, visitedMap, queue)
  } else if (node.y > node.previous.y) { // direction down
    addRightNode(node, visitedMap, queue)
  } else if (node.y < node.previous.y) { // direction up
    addLeftNode(node, visitedMap, queue)
  }
}

export const executeHorizontalSplitter = (node: Node, visitedMap: VisitedDirections[][], queue: Node[]): void => {
  if (node.x > node.previous.x) { // direction right
    executePassThrough(node, visitedMap, queue)
  } else if (node.x < node.previous.x) { // direction left
    executePassThrough(node, visitedMap, queue)
  } else if (node.y > node.previous.y) { // direction down
    addLeftNode(node, visitedMap, queue)
    addRightNode(node, visitedMap, queue)
  } else if (node.y < node.previous.y) { // direction up
    addLeftNode(node, visitedMap, queue)
    addRightNode(node, visitedMap, queue)
  }
}

export const executeVerticalSplitter = (node: Node, visitedMap: VisitedDirections[][], queue: Node[]): void => {
  if (node.x > node.previous.x) { // direction right
    addTopNode(node, visitedMap, queue)
    addDownNode(node, visitedMap, queue)
  } else if (node.x < node.previous.x) { // direction left
    addTopNode(node, visitedMap, queue)
    addDownNode(node, visitedMap, queue)
  } else if (node.y > node.previous.y) { // direction down
    executePassThrough(node, visitedMap, queue)
  } else if (node.y < node.previous.y) { // direction up
    executePassThrough(node, visitedMap, queue)
  }
}

const addTopNode = (node: Node, visitedMap: VisitedDirections[][], queue: Node[]): void => {
  if (node.y - 1 >= 0 && !visitedMap[node.y - 1][node.x].fromBottom) {
    visitedMap[node.y - 1][node.x].fromBottom = true
    queue.push({
      x: node.x,
      y: node.y - 1,
      previous: {
        x: node.x,
        y: node.y
      }
    })
  }
}

const addDownNode = (node: Node, visitedMap: VisitedDirections[][], queue: Node[]): void => {
  if (node.y + 1 < visitedMap.length && !visitedMap[node.y + 1][node.x].fromTop) {
    visitedMap[node.y + 1][node.x].fromTop = true

    queue.push({
      x: node.x,
      y: node.y + 1,
      previous: {
        x: node.x,
        y: node.y
      }
    })
  }
}

const addLeftNode = (node: Node, visitedMap: VisitedDirections[][], queue: Node[]): void => {
  if (node.x - 1 >= 0 && !visitedMap[node.y][node.x - 1].fromRight) {
    visitedMap[node.y][node.x - 1].fromRight = true
    queue.push({
      x: node.x - 1,
      y: node.y,
      previous: {
        x: node.x,
        y: node.y
      }
    })
  }
}

const addRightNode = (node: Node, visitedMap: VisitedDirections[][], queue: Node[]): void => {
  if (node.x + 1 < visitedMap[0].length && !visitedMap[node.y][node.x + 1].fromLeft) {
    visitedMap[node.y][node.x + 1].fromLeft = true
    queue.push({
      x: node.x + 1,
      y: node.y,
      previous: {
        x: node.x,
        y: node.y
      }
    })
  }
}
