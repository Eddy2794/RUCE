import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlazaListComponent } from './components/form-list/plaza-list/plaza-list.component';
import { PlazaInsupdComponent } from './components/form-insupd/plaza-insupd/plaza-insupd.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: PlazaListComponent },
      { path: 'add-edit/:id', component: PlazaInsupdComponent },
      { path: 'delete/:id', component: PlazaInsupdComponent },
      { path: 'view/:id', component: PlazaInsupdComponent },
      { path: '**', redirectTo: 'listar' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlazaRoutingModule { }
