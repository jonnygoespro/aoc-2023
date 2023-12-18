interface Corner {
  x: number
  y: number
}

export const parseInput = (input: string): [Corner[], number] => {
  const corners: Corner[] = []
  let x = 0
  let y = 0
  corners.push({
    x,
    y
  })

  let length = 0
  input.split('\n').forEach(row => {
    const [direction, amount, _] = row.split(' ')
    length += Number(amount)
    switch (direction) {
      case 'U':
        y -= Number(amount)
        break
      case 'D':
        y += Number(amount)
        break
      case 'R':
        x += Number(amount)
        break
      case 'L':
        x -= Number(amount)
        break
    }
    corners.push({
      x,
      y
    })
  })

  return [corners, length]
}

export const calculateArea = (corners: Corner[]): number => {
  let result = 0
  for (let i = corners.length - 1; i > 0; i--) {
    result += (corners[i].x * corners[i - 1].y) - (corners[i - 1].x * corners[i].y)
  }

  return 0.5 * Math.abs(result)
}

export const parseInputPartTwo = (input: string): [Corner[], number] => {
  const corners: Corner[] = []
  let x = 0
  let y = 0
  corners.push({
    x,
    y
  })

  let length = 0
  input.split('\n').forEach(row => {
    const color = row.split(' ')[2]
    const amount = parseInt(color.slice(2, 7), 16)
    const direction = color[color.length - 2]

    length += Number(amount)
    switch (direction) {
      case '3':
        y -= Number(amount)
        break
      case '1':
        y += Number(amount)
        break
      case '0':
        x += Number(amount)
        break
      case '2':
        x -= Number(amount)
        break
    }
    corners.push({
      x,
      y
    })
  })

  return [corners, length]
}
