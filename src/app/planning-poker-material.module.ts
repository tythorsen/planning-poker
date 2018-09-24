import { NgModule } from '@angular/core';
import { MatButtonModule,
         MatFormFieldModule,
         MatMenuModule,
         MatSelectModule,
         MatToolbarModule
       } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule
  ]
})
export class PlanningPokerMaterialModule {
  constructor() {}
}
