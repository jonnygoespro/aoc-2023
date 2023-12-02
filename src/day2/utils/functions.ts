import { Game, Round } from '../models/game'

export const parseInput = (input: string): Game[] => {
  const games: Game[] = []

  const lines = input.split('\n')
  let lineIndex = 0
  while (lineIndex < lines.length) {
    const line = lines[lineIndex]
    const [gameIdString, gameContentString] = line.split(':')
    const newGame: Game = {
      id: Number(gameIdString.split(' ')[1]),
      rounds: [],
      possible: undefined,
      fewestNumbers: undefined
    }

    const roundsArray = gameContentString.split(';')
    roundsArray.forEach((roundString) => {
      const round: Round = {
        red: 0,
        blue: 0,
        green: 0
      }
      const colorsArray = roundString.split(',')
      colorsArray.forEach((color) => {
        const colorArray = color.trim().split(' ')
        switch (colorArray[1]) {
          case 'red':
            round.red = Number(colorArray[0])
            break
          case 'blue':
            round.blue = Number(colorArray[0])
            break
          case 'green':
            round.green = Number(colorArray[0])
            break
        }
      })
      newGame.rounds.push(round)
    })

    games.push(newGame)
    lineIndex++
  }

  return games
}

export const calculatePossibility = (game: Game): Game => {
  const allowedColors = {
    red: 12,
    blue: 14,
    green: 13
  }

  for (const round of game.rounds) {
    if (round.red > allowedColors.red || round.green > allowedColors.green || round.blue > allowedColors.blue) {
      game.possible = false
      break
    }
  }

  if (game.possible === undefined) {
    game.possible = true
  }
  return game
}

export const calculateFewestCubes = (game: Game): Game => {
  let minimumReds = 0
  let minimumGreens = 0
  let minimumBlues = 0

  game.rounds.forEach((round) => {
    minimumReds = Math.max(minimumReds, round.red)
    minimumGreens = Math.max(minimumGreens, round.green)
    minimumBlues = Math.max(minimumBlues, round.blue)
  })

  game.fewestNumbers = minimumReds * minimumBlues * minimumGreens
  return game
}
