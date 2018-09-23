import { NgModule } from '@angular/core';
import { MatButtonModule,
         MatToolbarModule
       } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule
  ]
})
export class PlanningPokerMaterialModule {
  constructor() {}
}
