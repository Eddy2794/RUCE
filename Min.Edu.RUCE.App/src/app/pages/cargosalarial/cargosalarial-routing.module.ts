import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargosalarialListComponent } from './components/form-list/cargosalarial-list/cargosalarial-list.component';
import { CargosalarialInsupdComponent } from './components/form-insupd/cargosalarial-insupd/cargosalarial-insupd.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'listar', component: CargosalarialListComponent },
    { path: 'add-edit/:id', component: CargosalarialInsupdComponent },
    { path: 'delete/:id', component: CargosalarialInsupdComponent },
    { path: 'view/:id', component: CargosalarialInsupdComponent },
    { path: '**', redirectTo: 'listar' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargosalarialRoutingModule { }
