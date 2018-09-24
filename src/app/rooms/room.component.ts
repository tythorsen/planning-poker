import { Component, OnInit } from '@angular/core';

import { Deck } from '../decks/deck.model';
import { PlanningPokerService } from '../planning-poker.service';

@Component({
  selector: 'planning-poker-room',
  templateUrl: './room.component.html'
})
export class RoomComponent implements OnInit {

  public decks: Deck[];

  public constructor(private planningPoker: PlanningPokerService) {}

  public ngOnInit() {
    this.decks = this.planningPoker.getDecks();
  }
}
