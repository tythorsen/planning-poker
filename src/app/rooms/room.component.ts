import { Component, OnInit } from '@angular/core';

import { PlanningPokerService } from '../planning-poker.service';

@Component({
  selector: 'planning-poker-room',
  templateUrl: './room.component.html'
})
export class RoomComponent implements OnInit {

  public constructor(private planningPoker: PlanningPokerService) {}

  public ngOnInit() {}
}
