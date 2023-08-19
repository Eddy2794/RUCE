import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargofuncionalInsupdComponent } from './components/form-insupd/cargofuncional-insupd/cargofuncional-insupd.component';
import { CargofuncionalListComponent } from './components/form-list/cargofuncional-list/cargofuncional-list.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'listar', component: CargofuncionalListComponent },
    { path: 'add-edit/:id', component: CargofuncionalInsupdComponent },
    { path: 'delete/:id', component: CargofuncionalInsupdComponent },
    { path: 'view/:id', component: CargofuncionalInsupdComponent },
    { path: '**', redirectTo: 'listar' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargofuncionalRoutingModule { }
