import { Card } from '../models/card'

export const parseInput = (input: string): Card[] => {
  const cards: Card[] = []
  input.split('\n').forEach((line) => {
    const x = line.split(':')
    const y = x[0].split(' ')
    const [winningNumbers, myNumbers] = x[1].split('|')

    const card: Card = {
      id: Number(y[y.length - 1]),
      myNumbers: [],
      winningNumbers: [],
      amount: 1
    }

    winningNumbers.split(' ').forEach(num => { if (num !== '') card.winningNumbers.push(Number(num)) })
    myNumbers.split(' ').forEach(num => { if (num !== '') { card.myNumbers.push(Number(num)) } })

    cards.push(card)
  })
  return cards
}
