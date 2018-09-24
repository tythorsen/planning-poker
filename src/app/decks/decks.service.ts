import { Injectable } from '@angular/core';

import { Card } from './card.model';
import { Deck } from './deck.model';

@Injectable()
export class DecksService {

  private readonly decks: Deck[] = [
    new Deck('mountain-goat', 'Mountain Goat', [
      new Card('0', 0)
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

  public getDecks(): Deck[] {
    return this.decks;
  }
}
