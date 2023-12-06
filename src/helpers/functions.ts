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
