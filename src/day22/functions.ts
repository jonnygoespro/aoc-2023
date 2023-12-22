interface Brick {
    from: number[],
    to: number[],
    fallen?: boolean
}

export const parseInput = (input: string): Brick[] => {
    const bricks: Brick[] = []

    input.split('\n').map(row => {
        const [from, to] = row.split('~')
        const fromBrick = from.split(',').map(Number)
        const toBrick = to.split(',').map(Number)
        bricks.push({
            from: fromBrick,
            to: toBrick
        })
    })

    return bricks
}

export const applyGravity = (bricks: Brick[]) => {
    bricks.forEach((brick, index) => {
        let localI = index - 1

        while (brick.from[2] > 1 && localI >= 0) {
            let previousBricks = bricks.filter(elem => elem.to[2] === (brick.from[2] - 1)).filter(elem => isOverlap(elem, brick))
            if (previousBricks.length === 0) {
                brick.from[2] -= 1
                brick.to[2] -= 1
            } else {
                break
            }

            localI--
        }
    })

    return bricks
}

const isOverlap = (obj1: Brick, obj2: Brick): boolean => {
    let overlapX = (obj1.from[0] <= obj2.to[0] && obj1.to[0] >= obj2.from[0]) ||
        (obj2.from[0] <= obj1.to[0] && obj2.to[0] >= obj1.from[0])

    let overlapY = (obj1.from[1] <= obj2.to[1] && obj1.to[1] >= obj2.from[1]) ||
        (obj2.from[1] <= obj1.to[1] && obj2.to[1] >= obj1.from[1])

    return overlapX && overlapY
}

export const calculateDisintegratableBricks = (bricks: Brick[]): number => {
    let result = 0

    bricks.forEach((brick, index) => {
        let higherBricks = bricks.filter(elem => elem.from[2] === (brick.to[2] + 1)).filter(elem => isOverlap(elem, brick))

        if (higherBricks.length === 0) {
            result++
        } else {
            const bricksWithoutCurrentBrick = [...bricks]
            bricksWithoutCurrentBrick.splice(index, 1)
            const noneFallsDone = higherBricks.every(element => {
                let previousBricks = bricksWithoutCurrentBrick.filter(elem => elem.to[2] === (element.from[2] - 1)).filter(elem => isOverlap(elem, element))
                return previousBricks.length > 0
            })
            if (noneFallsDone) {
                result++
            }
        }
    })

    return result
}

export const countFallingBricks = (bricks: Brick[]): number => {
    let result = 0

    bricks.forEach((brick, index) => {
        let higherBricks = bricks.filter(elem => elem.from[2] === (brick.to[2] + 1)).filter(elem => isOverlap(elem, brick))

        if (higherBricks.length > 0) {
            let bricksWithoutCurrentBrick = [...bricks]
            bricksWithoutCurrentBrick.splice(index, 1)
            const noneFallsDone = higherBricks.every(element => {
                let previousBricks = bricksWithoutCurrentBrick.filter(elem => elem.to[2] === (element.from[2] - 1)).filter(elem => isOverlap(elem, element))
                return previousBricks.length > 0
            })

            // bricks would fall
            if (!noneFallsDone) {
                let localBricks = [...bricks]
                localBricks.splice(index, 1).forEach(localBrick => { localBrick.fallen = false })
                result += countFallingBlocksWhileApplyingGravity(localBricks)
            }
        }
    })

    return result
}

export const countFallingBlocksWhileApplyingGravity = (bricks: Brick[]): number => {
    const myBricks: Brick[] = JSON.parse(JSON.stringify(bricks)) // somehow this was a problem all of the time because there was no deepcopy here :(
    myBricks.forEach(brick => {
        while (brick.from[2] > 1) {
            let previousBricks = myBricks.filter(elem => elem.to[2] === (brick.from[2] - 1)).filter(elem => isOverlap(elem, brick))
            if (previousBricks.length === 0) {
                brick.from[2] -= 1
                brick.to[2] -= 1
                brick.fallen = true
            } else {
                break
            }
        }
    })

    return myBricks.filter(elem => elem.fallen).length
}