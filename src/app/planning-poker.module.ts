import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    PlanningPokerRoutingModule
  ],
  providers: [],
  bootstrap: [PlanningPokerComponent]
})
export class PlanningPokerModule { }
