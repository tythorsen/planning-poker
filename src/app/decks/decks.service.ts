import { Injectable } from '@angular/core';

import { Card } from './card.model';
import { Deck } from './deck.model';

@Injectable()
export class DecksService {

  private readonly decks: Deck[] = [
    new Deck('mountain-goat', 'Mountain Goat', [
      new Card('0', 0),
      new Card('0.5', 0.5),
      new Card('1', 1),
      new Card('2', 2),
      new Card('3', 3),
      new Card('5', 5),
      new Card('8', 8),
      new Card('13', 13),
      new Card('20', 20),
      new Card('40', 40),
      new Card('100', 100)
    ]),
    new Deck('fibonacci', 'Fibonacci', [
      new Card('0', 0)
    ]),
    new Deck('sequential', 'Sequential', [
      new Card('0', 0)
    ]),
    new Deck('t-shirt', 'T-Shirt', [
      new Card('XS', 0)
    ])
  ];

  public constructor() {}

  public getDeck(deckId: string): Deck {
    let decks = this.decks.filter(deck => {
      return deck.id === deckId;
    });

    return decks.length ? decks[0] : null;
  }

  public getDecks(): Deck[] {
    return this.decks;
  }
}
