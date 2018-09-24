import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlanningPokerService } from '../planning-poker.service';

@Component({
  selector: 'planning-poker-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public constructor(
    private planningPoker: PlanningPokerService,
    private router: Router
  ) {}

  public ngOnInit() {
  }

  public createNewRoom(): void {
    this.router.navigate(['/rooms', this.planningPoker.generateRoomId()]);
  }
}
