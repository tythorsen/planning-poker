import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class PlanningPokerService {

  public constructor(private firestore: AngularFirestore) {}

}
