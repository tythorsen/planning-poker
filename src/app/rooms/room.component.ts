import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Deck } from '../decks/deck.model';
import { PlanningPokerService } from '../planning-poker.service';

@Component({
  selector: 'planning-poker-room',
  templateUrl: './room.component.html'
})
export class RoomComponent implements OnInit, OnDestroy {

  public activeDeck: Deck;
  public decks: Deck[];
  public decksForm: FormGroup;
  public decksFormSubscription: Subscription;

  public constructor(
    private formBuilder: FormBuilder,
    private planningPoker: PlanningPokerService
  ) {}

  public ngOnInit() {
    this.decks = this.planningPoker.getDecks();

    this.decksForm = this.formBuilder.group({
      id: 'mountain-goat'
    });

    this.decksFormSubscription = this.decksForm.valueChanges.subscribe(value => {
      this.activeDeck = this.planningPoker.getDeck(value.id);
      console.log(this.activeDeck);
    });
  }

  public ngOnDestroy() {
    this.decksFormSubscription.unsubscribe();
  }
}
