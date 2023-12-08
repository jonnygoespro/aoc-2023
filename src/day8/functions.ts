import { Node } from "./models"

export const getLRInstructions = (input: string): string[] => {
    return input.split('\n\n')[0].split('')
}

export const getNodes = (input: string): Node[] => {
    const lines: Node[] = input.split('\n\n')[1]
        .split('\n')
        .map(line => {
            return {
                symbol: line.substring(0, 3),
                L: line.substring(7, 10),
                R: line.substring(12, 15),
            }
        })
    return lines
}