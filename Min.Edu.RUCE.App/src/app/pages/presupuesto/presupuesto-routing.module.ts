import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresupuestoInsUpdComponent } from './components/form-insupd/presupuesto-insupd.component';
import { PresupuestoListComponent } from './components/form-list/presupuesto-list.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'listar', component: PresupuestoListComponent },
    { path: 'add-edit/:id', component: PresupuestoInsUpdComponent },
    { path: 'view/:id', component: PresupuestoInsUpdComponent },
    { path: 'delete/:id', component: PresupuestoInsUpdComponent },
    { path: '**', redirectTo: 'listar' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresupuestoRoutingModule { }
