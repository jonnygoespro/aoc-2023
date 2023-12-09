export const parseInput = (input: string): number[][] => {
  return input.split('\n').map(line => line.split(' ').filter(val => val !== '').map(string => Number(string)))
}

export const generateDerivations = (numbers: number[]): number[][] => {
  const derivations = [numbers]
  while (new Set(derivations[derivations.length - 1]).size !== 1) {
    const transformedLine = derivations[derivations.length - 1].reduce((prev: number[], curr: number, i: number) => {
      return (i > 0) ? [...prev, curr - derivations[derivations.length - 1][i - 1]] : prev
    }, [])
    derivations.push(transformedLine)
  }
  return derivations
}

export const extendDerivations = (derivations: number[][]): number[][] => {
  for (let i = derivations.length - 2; i >= 0; i--) {
    derivations[i].push(derivations[i + 1][derivations[i + 1].length - 1] + derivations[i][derivations[i].length - 1])
  }
  return derivations
}
