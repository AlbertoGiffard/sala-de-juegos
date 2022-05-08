import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreguntadoRoutingModule } from './preguntado-routing.module';
import { PreguntadoComponent } from './preguntado.component';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    PreguntadoComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    PreguntadoRoutingModule,
    FontAwesomeModule
  ]
})
export class PreguntadoModule { }
