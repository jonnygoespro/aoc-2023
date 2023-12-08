export const quadraticFormula = (a: number, b: number, c: number): number[] => {
  const results: number[] = []
  const discriminant = b * b - 4 * a * c

  if (discriminant > 0) {
    results.push((-b + Math.sqrt(discriminant)) / (2 * a))
    results.push((-b - Math.sqrt(discriminant)) / (2 * a))
  } else if (discriminant === 0) {
    results.push(-b / (2 * a))
  }

  return results
}

const greatestCommonDivisor = (a: number, b: number): number => {
  for (let temp = b; b !== 0;) {
    b = a % b
    a = temp
    temp = b
  }
  return a
}

export const lowestCommonMultiplier = (a: number, b: number): number => {
  const gcdValue = greatestCommonDivisor(a, b)
  return (a * b) / gcdValue
}
