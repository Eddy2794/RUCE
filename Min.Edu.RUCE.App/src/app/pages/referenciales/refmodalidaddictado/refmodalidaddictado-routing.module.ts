import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RefmodalidaddictadoListComponent } from './components/form-list/refmodalidaddictado-list/refmodalidaddictado-list.component';
import { RefmodalidaddictadoInsupdComponent } from './components/form-insupd/refmodalidaddictado-insupd/refmodalidaddictado-insupd.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'listar', component: RefmodalidaddictadoListComponent},
    { path: 'add-edit/:id', component: RefmodalidaddictadoInsupdComponent },
    { path: 'delete/:id', component: RefmodalidaddictadoInsupdComponent },
    { path: '**', redirectTo: 'listar'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefmodalidaddictadoRoutingModule { }
