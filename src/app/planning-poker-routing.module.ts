import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RoomComponent } from './rooms/room.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'rooms/:roomId',
    component: RoomComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PlanningPokerRoutingModule { }
