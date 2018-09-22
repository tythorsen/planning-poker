import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { PlanningPokerMaterialModule } from './planning-poker-material.module';
import { PlanningPokerRoutingModule } from './planning-poker-routing.module';

import { HomeComponent } from './home/home.component';
import { PlanningPokerComponent } from './planning-poker.component';
import { PlanningPokerService } from './planning-poker.service';
import { RoomComponent } from './rooms/room.component';

@NgModule({
  declarations: [
    HomeComponent,
    PlanningPokerComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    PlanningPokerMaterialModule,
    PlanningPokerRoutingModule
  ],
  providers: [
    PlanningPokerService
  ],
  bootstrap: [PlanningPokerComponent]
})
export class PlanningPokerModule { }
