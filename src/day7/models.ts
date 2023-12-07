export interface Hand {
  hand: number[]
  strength: Strength
  bid: number
}

export enum Strength {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  FiveOfAKind
}

export interface HandWithInfo {
  hand: number[]
  amountJoker: number
  highestOccurence: Occurence
  secondHighestOccurence: Occurence | undefined
  occuringNumbers: number
}

export interface Occurence {
  symbol: number
  amount: number
}
