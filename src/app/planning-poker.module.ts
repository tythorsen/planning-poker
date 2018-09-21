import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';

import { PlanningPokerRoutingModule } from './planning-poker-routing.module';

import { HomeComponent } from './home/home.component';
import { PlanningPokerComponent } from './planning-poker.component';

@NgModule({
  declarations: [
    HomeComponent,
    PlanningPokerComponent
  ],
  imports: [
    BrowserModule,
    PlanningPokerRoutingModule
  ],
  providers: [],
  bootstrap: [PlanningPokerComponent]
})
export class PlanningPokerModule { }
