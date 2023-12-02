export interface Round {
  red: number
  blue: number
  green: number
}

export interface Game {
  id: number
  rounds: Round[]
  possible: boolean | undefined
  fewestNumbers: number | undefined
}
