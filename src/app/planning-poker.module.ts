import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { PlanningPokerMaterialModule } from './planning-poker-material.module';
import { PlanningPokerRoutingModule } from './planning-poker-routing.module';

import { DecksService } from './decks/decks.service';
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
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    PlanningPokerMaterialModule,
    PlanningPokerRoutingModule
  ],
  providers: [
    DecksService,
    PlanningPokerService
  ],
  bootstrap: [PlanningPokerComponent]
})
export class PlanningPokerModule { }
