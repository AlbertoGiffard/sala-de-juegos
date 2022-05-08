import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreguntadoComponent } from './preguntado.component';

const routes: Routes = [{ path: '', component: PreguntadoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreguntadoRoutingModule { }
