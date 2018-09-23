import { Component, OnInit } from '@angular/core';

import { PlanningPokerService } from '../planning-poker.service';

@Component({
  selector: 'planning-poker-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public constructor(
    private planningPoker: PlanningPokerService
  ) {}

  public ngOnInit() {
  }
}
