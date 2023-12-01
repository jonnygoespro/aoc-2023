import { Calibration } from '../models/calibration'

export const transformInputPart1 = (input: string): Calibration[] => {
  const calibrations: Calibration[] = []
  const array = input.split('\n')

  let i = 0
  while (i < array.length) {
    const line = array[i]
    let firstNumber: number
    let lastNumber: number

    let j = 0
    while (true) {
      if (!isNaN(Number(line[j]))) {
        firstNumber = Number(line[j])
        break
      }
      j++
    }

    j = line.length - 1
    while (true) {
      if (!isNaN(Number(line[j]))) {
        lastNumber = Number(line[j])
        break
      }
      j--
    }

    calibrations.push({
      num: Number(`${firstNumber}${lastNumber}`)
    })

    i++
  }

  return calibrations
}

export const transformInputPart2 = (input: string): Calibration[] => {
  const calibrations: Calibration[] = []
  const array = input.split('\n')

  let i = 0
  while (i < array.length) {
    const line = array[i]
    const regexFirstNum = line.match(/(one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9)/g)
    // reverse string for backwards search to resolve case like "onetwo" not finding the two
    const reverseLine: string = line.split('').reverse().join('')
    const regexLastNum = reverseLine.match(/(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|1|2|3|4|5|6|7|8|9)/g)

    if ((regexFirstNum != null) && (regexLastNum != null)) {
      const firstNumber = getNumber(regexFirstNum[0])
      const lastNumber = getNumber(regexLastNum[0])

      calibrations.push({
        num: Number(`${firstNumber}${lastNumber}`)
      })
    }
    i++
  }

  return calibrations
}

const getNumber = (input: string): number => {
  let num = 0
  switch (input) {
    case '1':
    case 'one':
    case 'eno':
      num = 1
      break
    case '2':
    case 'two':
    case 'owt':
      num = 2
      break
    case '3':
    case 'three':
    case 'eerht':
      num = 3
      break
    case '4':
    case 'four':
    case 'ruof':
      num = 4
      break
    case '5':
    case 'five':
    case 'evif':
      num = 5
      break
    case '6':
    case 'six':
    case 'xis':
      num = 6
      break
    case '7':
    case 'seven':
    case 'neves':
      num = 7
      break
    case '8':
    case 'eight':
    case 'thgie':
      num = 8
      break
    case '9':
    case 'nine':
    case 'enin':
      num = 9
      break
  }
  return num
}
