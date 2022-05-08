import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TetrisRoutingModule } from './tetris-routing.module';
import { TetrisComponent } from './tetris.component';

import {TetrisCoreModule} from 'ngx-tetris';


@NgModule({
  declarations: [
    TetrisComponent
  ],
  imports: [
    CommonModule,
    TetrisRoutingModule,
    TetrisCoreModule
  ]
})
export class TetrisModule { }
