import { PokerHandType } from './pokerHandType.model'
import { PlayingCard } from '../card/playingCard.model'
import { IRankSet } from '../card/rankSet.interface'
import { AceHighRankSet } from '../card/aceHighRankSet.model'

export class PokerHandResult {
  /**
   * Type of hand created with
   * `cardsUsed`.
   */
  public handType: PokerHandType
  /**
   * Comparable value of current hand
   * to rank above or below another
   * `PokerHandResult`.
   */
  public value: number = 0
  /**
   * All cards used to determine
   * result.
   */
  public cards: PlayingCard[] = []
  /**
   * Cards in result.
   */
  public cardsUsed: PlayingCard[] = []
  /**
   * RankSet used to help determine highest ranked kickers
   * not used in hand score
   */
  public rankSet: IRankSet
  /**
   * Cards that were used when scoring the hand
   * but had no impact on the score itself. Used to
   * help determine a winner in event of a tied score value.
   */
  public get kickers (): PlayingCard[] {
    const cardsNotUsedInResult =
      this.cards.filter((c) => this.cardsUsed.map(u => u.getIndex()).indexOf(c.getIndex()) === -1)
        .sort((a, b) => this.rankSet.getRankValue(b) - this.rankSet.getRankValue(a))
    return [...cardsNotUsedInResult]
  }

  // public get scoringHandCardNames (): string[] {
  //   const pullSingleCardForDescription =
  //     [PokerHandType.FourOfAKind, PokerHandType.ThreeOfAKind, PokerHandType.OnePair]
  //   if (pullSingleCardForDescription.indexOf(this.handType) >= 0) {
  //     return [CardName[this.cardsUsed[0].cardName]]
  //   } else if (this.handType === PokerHandType.TwoPair) {
  //     return [CardName[this.cardsUsed[0].cardName], CardName[this.cardsUsed[2].cardName]]
  //   } else if (this.handType === PokerHandType.FullHouse) {
  //     return [CardName[this.cardsUsed[0].cardName], CardName[this.cardsUsed[3].cardName]]
  //   } else {
  //     return this.cardsUsed.map(c => CardName[c.cardName].toString())
  //   }
  // }

  constructor (
    cards: PlayingCard[] = [],
    value: number = 0,
    cardsUsed: PlayingCard[] = [],
    rankSet = new AceHighRankSet()
  ) {
    this.cards = cards
    this.value = value
    this.cardsUsed = cardsUsed
    this.rankSet = rankSet
  }

  setHandType (type: PokerHandType): this {
    this.handType = type
    return this
  }

  toString (): string {
    return PokerHandType[this.handType]
      // Look for long acronyms and filter out the last letter
      .replace(/([A-Z]+)([A-Z][a-z])/g, ' $1 $2')
      // Look for lower-case letters followed by upper-case letters
      .replace(/([a-z\d])([A-Z])/g, '$1 $2')
      // Look for lower-case letters followed by numbers
      .replace(/([a-zA-Z])(\d)/g, '$1 $2')
      .replace(/^./, function (str) { return str.toUpperCase() })
      // Remove any white space left around the word
      .trim()
  }
}
