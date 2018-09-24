import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'firebase';

import { PlanningPokerService } from './planning-poker.service';

@Component({
  selector: 'planning-poker',
  templateUrl: './planning-poker.component.html'
})
export class PlanningPokerComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;
  public user: User

  public constructor(private planningPoker: PlanningPokerService) {}

  public ngOnInit(): void {
    this.userSubscription = this.planningPoker.getUser().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
