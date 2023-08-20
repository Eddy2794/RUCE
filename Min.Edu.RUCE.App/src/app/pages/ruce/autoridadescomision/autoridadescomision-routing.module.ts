import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoridadComisionListComponent } from './Components/autoridad-list/autoridad-list.component';
import { AutoridadComisionInsupdComponent } from './Components/autoridad-insupd/autoridad-insupd.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'listar', component: AutoridadComisionListComponent },
    { path: 'add-edit/:id', component: AutoridadComisionInsupdComponent },
    { path: 'view/:id', component: AutoridadComisionInsupdComponent },
    { path: 'delete/:id', component: AutoridadComisionInsupdComponent },
    { path: '**', redirectTo: 'listar' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoridadescomisionRoutingModule { }
