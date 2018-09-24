import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from 'firebase';

import { Deck } from './decks/deck.model';
import { DecksService } from './decks/decks.service';

@Injectable()
export class PlanningPokerService {

  public constructor(
    private angularFireAuth: AngularFireAuth,
    private decksService: DecksService,
    private firestore: AngularFirestore
  ) {}

  public generateRoomId(): number {
    return Math.floor(Math.random() * 899999) + 100000;
  }

  public getDecks(): Deck[] {
    return this.decksService.getDecks();
  }

  public getUser(): Observable<User> {
    return this.angularFireAuth.user;
  }
}
