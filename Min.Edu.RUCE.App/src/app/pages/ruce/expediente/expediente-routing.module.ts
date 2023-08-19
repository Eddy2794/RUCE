import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpedienteListComponent } from './Components/frm-list/expediente-list/expediente-list.component';
import { ExpedienteInsupdComponent } from './Components/expediente-insupd/expediente-insupd.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'listar', component: ExpedienteListComponent },
    { path: 'add-edit/:id', component: ExpedienteInsupdComponent },
    { path: 'view/:id', component: ExpedienteInsupdComponent },
    { path: 'delete/:id', component: ExpedienteInsupdComponent },
    { path: '**', redirectTo: 'listar' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpedienteRoutingModule { }
