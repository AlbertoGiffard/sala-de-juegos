import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaRoutingModule } from './sala-routing.module';
import { SalaComponent } from './sala.component';
import { ChatComponent } from '../chat/chat.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';


@NgModule({
  declarations: [
    SalaComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    SalaRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SalaModule { }
