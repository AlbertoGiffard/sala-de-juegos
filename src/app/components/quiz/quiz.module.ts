import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuizComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    ReactiveFormsModule
  ]
})
export class QuizModule { }
