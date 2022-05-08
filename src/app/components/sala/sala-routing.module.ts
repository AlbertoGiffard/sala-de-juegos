import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaComponent } from './sala.component';

const routes: Routes = [
  { 
    path: '', 
    component: SalaComponent 
  },
  { path: 'ahorcado', loadChildren: () => import('./ahorcado/ahorcado.module').then(m => m.AhorcadoModule) },
  { path: 'mayorMenor', loadChildren: () => import('./mayor-menor/mayor-menor.module').then(m => m.MayorMenorModule) },
  { path: 'preguntado', loadChildren: () => import('./preguntado/preguntado.module').then(m => m.PreguntadoModule) },
  { path: 'tetris', loadChildren: () => import('./tetris/tetris.module').then(m => m.TetrisModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaRoutingModule { }
