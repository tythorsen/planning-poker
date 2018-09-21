import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';

import { PlanningPokerComponent } from './planning-poker.component';

@NgModule({
  declarations: [
    PlanningPokerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [PlanningPokerComponent]
})
export class PlanningPokerModule { }
