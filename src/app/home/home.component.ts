import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { PlanningPokerService } from '../planning-poker.service';

@Component({
  selector: 'planning-poker-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public constructor(
    private angularFireAuth: AngularFireAuth,
    private planningPoker: PlanningPokerService
  ) {}

  public ngOnInit() {
    this.angularFireAuth.user.subscribe(data => {
      console.log(data);
    });
  }

  public signIn(): void {
    this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public signOut(): void {
    this.angularFireAuth.auth.signOut();
  }
}
