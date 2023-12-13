import { create2dArray, transposeMatrix } from "../helpers/array"

export const parseInput = (input: string) => {
    const reflections: Reflection[] = []

    input.split('\n\n').forEach(reflectionString => {
        const map = create2dArray(reflectionString)
        
        let type: 'vertical' | 'horizontal' | 'unknown' = 'unknown'
        let reflection = findReflectionIfExists(map)

        if (reflection !== undefined) {
            type = 'vertical'
        } else {
            const transposedMap = transposeMatrix(map)
            reflection = findReflectionIfExists(transposedMap)
            if (reflection !== undefined) {
                type = 'horizontal'
            } else {
                console.log('ERROR')
            }
        }

        reflections.push({
            map: map,
            type: type,
            line: reflection!,
        })
    })

    return reflections
}

const findReflectionIfExists = (map: string[][], bool?: boolean, currentLine?: number): number | undefined => {
    const possibleReflections = []
    let reflection: number | undefined = undefined

    for (let i = 0; i < map[0].length; i++) {
        if (map.every((value, j) => value[i] === map[j][i + 1])) {
            possibleReflections.push(i)
        }
    }

    possibleReflections.forEach(index => {
        let isRealReflection = true
        let leftSide = index
        let rightSide = index + 1
        while (leftSide >= 0 && rightSide < map[0].length) {
            if (!map.every((value, j) => value[leftSide] === map[j][rightSide])) {
                isRealReflection = false
                break
            }
            leftSide--
            rightSide++
        }
        if (isRealReflection) {
            if (bool !== undefined && bool) {
                if (index !== currentLine) {
                    reflection = index
                }
            } else {
                reflection = index
            }
        }
    })

    return reflection
}

export const findNewReflection = (reflection: Reflection): Reflection => {
    for (let y = 0; y < reflection.map.length; y++) {
        for (let x = 0; x < reflection.map[0].length; x++) {
            const localMap = reflection.map.map(row => [...row])
            localMap[y][x] = (localMap[y][x] === '#') ? '.' : '#'

            let newType: 'vertical' | 'horizontal' | 'unknown' = 'unknown'
            let newReflection = findReflectionIfExists(localMap, (reflection.type === 'vertical'), reflection.line)
            if (newReflection !== undefined) {
                newType = 'vertical'
            } else {
                const transposedMap = transposeMatrix(localMap)
                newReflection = findReflectionIfExists(transposedMap, (reflection.type === 'horizontal'), reflection.line)
                if (newReflection !== undefined) {
                    newType = 'horizontal'
                }
            }

            if (newReflection !== undefined) {
                return {
                    map: localMap,
                    type: newType,
                    line: newReflection
                }
            }
        }
    }

    return reflection
}

export const calculateReflectionSum = (reflections: Reflection[]): number => {
    let result = 0
    reflections.forEach(reflection => {
        result += (reflection.type === 'vertical') ? (reflection.line + 1) : ((reflection.line + 1) * 100)
    })
    return result
}