import { RefjornadaInsupdComponent } from './components/form-insupd/refjornada-insupd/refjornada-insupd.component';
import { RefjornadaListComponent } from './components/form-list/refjornada-list/refjornada-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: RefjornadaListComponent },
      { path: 'add-edit/:id', component: RefjornadaInsupdComponent},
      { path: 'delete/:id', component: RefjornadaInsupdComponent },
      { path: '**', redirectTo: 'listar' }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefjornadaRoutingModule { }
