export const extractLoopFromMaze = (maze: string[][]): string[][] => {
    const mazeWithLoop: string[][] = maze.map(line => line.map(_ => "")) 

    const startingY = maze.findIndex((line) => line.includes('S'))
    const startingX = maze[startingY].findIndex((element) => element === 'S')

    const startingPipe = getPipeOfStartingPosition(startingX, startingY, maze)
    mazeWithLoop[startingY][startingX] = maze[startingY][startingX]

    let x = startingX
    let y = startingY
    let loopLength = 1
    let breakLoop = false

    while (!breakLoop) {
        // loop through connecting connections
        const directions = maze[y][x] === 'S' ? mapping[startingPipe] : mapping[maze[y][x]]
        for (const direction of Object.entries(directions).filter(value => value[1] !== 0)) {
            if (direction[0] === 'north') {
                // check if i been there
                if (mazeWithLoop[y + Number(direction[1])][x] === 'S' && loopLength > 2) {
                    breakLoop = true
                } else if (mazeWithLoop[y + Number(direction[1])][x] !== '') {
                    continue
                }

                // apply direction
                y = y + Number(direction[1])
                mazeWithLoop[y][x] = maze[y][x]
                break
            } else if (direction[0] === 'south') {
                // check if i been there
                if (mazeWithLoop[y + Number(direction[1])][x] === 'S' && loopLength > 2) {
                    breakLoop = true
                } else if (mazeWithLoop[y + Number(direction[1])][x] !== '') {
                    continue
                }

                // apply direction
                y = y + Number(direction[1])
                mazeWithLoop[y][x] = maze[y][x]
                break
            } else if (direction[0] === 'east') {
                // check if i been there
                if (mazeWithLoop[y][x + Number(direction[1])] === 'S' && loopLength > 2) {
                    breakLoop = true
                } else if (mazeWithLoop[y][x + Number(direction[1])] !== '') {
                    continue
                }

                // apply direction
                x = x + Number(direction[1])
                mazeWithLoop[y][x] = maze[y][x]
                break
            } else if (direction[0] === 'west') {
                // check if i been there
                if (mazeWithLoop[y][x + Number(direction[1])] === 'S' && loopLength > 2) {
                    breakLoop = true
                } else if (mazeWithLoop[y][x + Number(direction[1])] !== '') {
                    continue
                }

                // apply direction
                x = x + Number(direction[1])
                mazeWithLoop[y][x] = maze[y][x]
                break
            }
        }

        loopLength++
    }

    return mazeWithLoop
}

export const getPipeOfStartingPosition = (x: number, y: number, maze: string[][]): string => {
    const isNorthConnected = (y > 0) && ((maze[y-1][x] === 'F') || (maze[y-1][x] === '7') || (maze[y-1][x] === '|'))
    const isSouthConnected = (y < maze.length - 1) && ((maze[y+1][x] === 'L') || (maze[y+1][x] === 'J') || (maze[y+1][x] === '|'))
    const isWestConnected = (x > 0) && ((maze[y][x-1] === 'L') || (maze[y][x-1] === 'F') || (maze[y][x-1] === '-'))
    const isEastConnected = (x < maze[0].length - 1) && ((maze[y][x+1] === 'J') || (maze[y][x+1] === '7') || (maze[y][x+1] === '-'))

    if (isNorthConnected && isSouthConnected && !isEastConnected && !isWestConnected) {
        return '|'
    } else if (!isNorthConnected && !isSouthConnected && isEastConnected && isWestConnected) {
        return '-'
    } else if (!isNorthConnected && isSouthConnected && !isEastConnected && isWestConnected) {
        return '7'
    } else if (!isNorthConnected && isSouthConnected && isEastConnected && !isWestConnected) {
        return 'F'
    } else if (isNorthConnected && !isSouthConnected && !isEastConnected && isWestConnected) {
        return 'J'
    } else if (isNorthConnected && !isSouthConnected && isEastConnected && !isWestConnected) {
        return 'L'
    } else {
        throw Error('unknow start position')
    }
}

const mapping: any = {
    '|': {
        north: -1,
        east: 0,
        south: 1,
        west: 0
    },
    '-': {
        north: 0,
        east: 1,
        south: 0,
        west: -1
    },
    '7': {
        north: 0,
        east: 0,
        south: 1,
        west: -1
    },
    'F': {
        north: 0,
        east: 1,
        south: 1,
        west: 0
    },
    'J': {
        north: -1,
        east: 0,
        south: 0,
        west: -1
    },
    'L': {
        north: -1,
        east: 1,
        south: 0,
        west: 0
    }
}