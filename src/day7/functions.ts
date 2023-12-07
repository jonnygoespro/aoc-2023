import { Hand, HandWithInfo, Occurence, Strength } from './models'

export const parseInput = (input: string, part: number): Hand[] => {
  const hands: Hand[] = []

  input.split('\n').forEach((handLine) => {
    const [handString, bidString] = handLine.split(' ')
    const hand = parseHandStringToHand(handString, part)
    hands.push({
      hand,
      bid: Number(bidString),
      strength: getStrengthFromHand(hand)
    })
  })

  return hands
}

export const rankHands = (hands: Hand[]): void => {
  hands.sort((a, b) => {
    if (b.strength !== a.strength) {
      return b.strength - a.strength
    }

    for (let i = 0; i < 5; i++) {
      if (a.hand[i] !== b.hand[i]) {
        return b.hand[i] - a.hand[i]
      }
    }

    return 0
  })
}

export const calculateWinningSum = (hands: Hand[]): string => {
  return hands.reduce((prev, curr, i) => prev + curr.bid * (hands.length - i), 0).toString()
}

const parseHandStringToHand = (handString: string, part: number): number[] => {
  const cardValues: Record<string, number> = {
    A: 14,
    K: 13,
    Q: 12,
    J: (part === 1) ? 11 : 1,
    T: 10
  }

  return handString.split('').map(char => cardValues[char] ?? Number(char))
}

const getStrengthFromHand = (hand: number[]): Strength => {
  let strength: Strength = Strength.HighCard

  const occurences = findOccurencesInHand(hand)
  const repeatingCards: HandWithInfo = {
    hand,
    amountJoker: occurences.find(object => object.symbol === 1)?.amount ?? 0,
    highestOccurence: occurences.sort((a, b) => (b.amount !== a.amount) ? b.amount - a.amount : b.symbol - a.symbol)[0],
    secondHighestOccurence: occurences.sort((a, b) => (b.amount !== a.amount) ? b.amount - a.amount : b.symbol - a.symbol)[1],
    occuringNumbers: new Set(hand).size
  }

  transformJokersToBestCard(repeatingCards) // works with both parts because in part 2 joker is seen as a '1' and in part 1 as a '11'

  switch (repeatingCards.highestOccurence.amount) {
    case 5:
      strength = Strength.FiveOfAKind
      break
    case 4:
      strength = Strength.FourOfAKind
      break
    case 3:
      strength = (repeatingCards.occuringNumbers === 2) ? Strength.FullHouse : Strength.ThreeOfAKind
      break
    case 2:
      strength = (repeatingCards.occuringNumbers === 3) ? Strength.TwoPair : Strength.OnePair
      break
  }

  return strength
}

const transformJokersToBestCard = (repeatingCards: HandWithInfo): void => {
  if (repeatingCards.amountJoker > 0) {
    if (repeatingCards.highestOccurence.symbol === 1) { // highest occurence is a joker
      if (repeatingCards.occuringNumbers === 1) { // five of a kind of jokers
        repeatingCards.hand = repeatingCards.hand.map(_ => 14)
      } else {
        repeatingCards.hand = repeatingCards.hand.map(symbol => (symbol === 1 && (repeatingCards.secondHighestOccurence != null)) ? repeatingCards.secondHighestOccurence.symbol : symbol)
      }
    } else { // highest occurence is not a joker
      repeatingCards.hand = repeatingCards.hand.map(symbol => (symbol === 1) ? repeatingCards.highestOccurence.symbol : symbol)
    }

    // update occuring numbers
    repeatingCards.occuringNumbers = new Set(repeatingCards.hand).size
    const occurences = findOccurencesInHand(repeatingCards.hand)
    repeatingCards.highestOccurence = occurences.sort((a, b) => (b.amount !== a.amount) ? b.amount - a.amount : b.symbol - a.symbol)[0]
  }
}

const findOccurencesInHand = (hand: number[]): Occurence[] => {
  return hand.reduce((array: Occurence[], symbol: number) => {
    const indexOfSymbol = array.findIndex((object: Occurence) => object.symbol === symbol)
    if (indexOfSymbol !== -1) {
      array[indexOfSymbol].amount++
    } else {
      array.push({
        symbol,
        amount: 1
      })
    }
    return array
  }, [])
}
