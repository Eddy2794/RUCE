import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoridadInsupdComponent } from './Components/autoridad-insupd/autoridad-insupd.component';
import { AutoridadListComponent } from './Components/autoridad-list/autoridad-list.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'listar', component: AutoridadListComponent },
    { path: 'add-edit/:id', component: AutoridadInsupdComponent },
    { path: 'view/:id', component: AutoridadInsupdComponent },
    { path: 'delete/:id', component: AutoridadInsupdComponent },
    { path: '**', redirectTo: 'listar' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoridadescomisionRoutingModule { }
