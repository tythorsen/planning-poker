import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Injectable()
export class PlanningPokerService {

  public constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  public get_user(): Observable<User> {
    return this.angularFireAuth.user;
  }

}
