import { Day } from '../day'
// import { init } from 'z3-solver'

class Day24 extends Day {
  constructor () {
    super(24)
  }

  solveForPartOne (input: string): string {
    const rocks: number[][] = []
    input.split('\n').forEach(line => {
      const rock = line.replace(' @', ',').split(',').map(Number)
      rocks.push(rock)
    })

    const min = 200000000000000
    const max = 400000000000000
    // const min = 7
    // const max = 27

    let result = 0
    for (let i = 0; i < rocks.length; i++) {
      for (let j = i + 1; j < rocks.length; j++) {
        const rock1 = rocks[i]
        const rock2 = rocks[j]
        const x1 = +rock1[0]
        const y1 = +rock1[1]
        const x2 = +rock1[3] + x1
        const y2 = +rock1[4] + y1

        const x3 = +rock2[0]
        const y3 = +rock2[1]
        const x4 = +rock2[3] + x3
        const y4 = +rock2[4] + y3

        const intersection = findIntersection(x1, y1, x2, y2, x3, y3, x4, y4)
        if (intersection !== undefined) {
          const x = intersection.x
          const y = intersection.y
          if ((x > x1 == x2 - x1 > 0) && (y > y1 == y2 - y1 > 0) && (x > x3 == x4 - x3 > 0) && (y > y3 == y4 - y3 > 0)) {
            if (x >= min && x <= max && y >= min && y <= max) {
              result++
            }
          }
        }
      }
    }

    return result.toString()
  }

  solveForPartTwo (input: string): string {
    return 'not commiting real code, because async z3-solver messed with my project setup'
  }
  // async solveForPartTwo (input: string): Promise<string> {
  //   const rocks: number[][] = []
  //   input.split('\n').forEach(line => {
  //     const rock = line.replace(' @', ',').split(',').map(Number)
  //     rocks.push(rock)
  //   })

  //   const test = async () => {
  //     const { Context }: any = await init()
  //     const { Solver, Int } = new Context('main')
  //     const solver = new Solver()
  //     const x = Int.const('x')
  //     const y = Int.const('y')
  //     const z = Int.const('z')
  //     const dx = Int.const('dx')
  //     const dy = Int.const('dy')
  //     const dz = Int.const('dz')
  //     const t = rocks.map((_, i) => Int.const(`t${i}`))

  //     rocks.forEach((h, i) => {
  //       solver.add(t[i].mul(h[3]).add(h[0]).sub(x).sub(t[i].mul(dx)).eq(0))
  //       solver.add(t[i].mul(h[4]).add(h[1]).sub(y).sub(t[i].mul(dy)).eq(0))
  //       solver.add(t[i].mul(h[5]).add(h[2]).sub(z).sub(t[i].mul(dz)).eq(0))
  //     })
  //     await solver.check()

  //     console.log('Part 2', Number(solver.model().eval(x.add(y).add(z)).value()))
  //     return Number(solver.model().eval(x.add(y).add(z)).value()).toString()
  //   }

  //   return await test()
  // }
}

export default new Day24()

const findIntersection = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) => {
  const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1)
  if (denom == 0) {
    return undefined
  }

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom
  return {
    x: x1 + ua * (x2 - x1),
    y: y1 + ua * (y2 - y1)
  }
}
