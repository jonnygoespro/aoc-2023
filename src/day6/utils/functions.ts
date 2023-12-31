import { quadraticFormula } from '../../helpers/functions'
import { Race } from '../models/models'

export const parseInputPart1 = (input: string): Race[] => {
  const races: Race[] = []

  const lines = input.split('\n')
  const times = lines[0].split(' ').filter(time => time !== '').slice(1).map(string => Number(string))
  const distances = lines[1].split(' ').filter(time => time !== '').slice(1).map(string => Number(string))

  for (let i = 0; i < times.length; i++) {
    races.push({
      duration: times[i],
      record: distances[i],
      victoryRuns: 0
    })
  }

  return races
}

export const parseInputPart2 = (input: string): Race => {
  const lines = input.split('\n')
  const time = Number(lines[0].split(' ').filter(time => time !== '').slice(1).join(''))
  const distance = Number(lines[1].split(' ').filter(time => time !== '').slice(1).join(''))

  return {
    duration: time,
    record: distance,
    victoryRuns: 0
  }
}

export const calculateVictoryRunsBruteForce = (race: Race): number => {
  let victoryRuns = 0
  for (let secondsHolding = 1; secondsHolding < race.duration; secondsHolding++) {
    victoryRuns += ((race.duration - secondsHolding) * secondsHolding) > race.record ? 1 : 0
  }
  return victoryRuns
}

export const calculateVictoryRunsMathematically = (race: Race): number => {
  const bounds = quadraticFormula(-1, race.duration, -race.record)
  const bound1 = (bounds[0] % 1 === 0) ? bounds[0] + 1 : Math.ceil(bounds[0])
  const bound2 = Math.ceil(bounds[1])
  return bound2 - bound1
}
