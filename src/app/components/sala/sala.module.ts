import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaRoutingModule } from './sala-routing.module';
import { SalaComponent } from './sala.component';


@NgModule({
  declarations: [
    SalaComponent
  ],
  imports: [
    CommonModule,
    SalaRoutingModule
  ]
})
export class SalaModule { }
