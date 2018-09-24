import { Card } from './card.model';

export class Deck {
  public id: string;
  public name: string;
  public cards: Card[];

  public constructor(id: string, name: string, cards: Card[]) {
    this.id = id;
    this.name = name;
    this.cards = cards;
  }
}
