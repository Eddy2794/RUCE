import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FondoListComponent } from './Components/fondo-list/fondo-list.component';
import { FondoInsupdComponent } from './Components/fondo-insupd/fondo-insupd.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'listar', component: FondoListComponent },
    { path: 'add-edit/:id', component: FondoInsupdComponent },
    { path: 'view/:id', component: FondoInsupdComponent },
    { path: 'delete/:id', component: FondoInsupdComponent },
    { path: '**', redirectTo: 'listar' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FondoRoutingModule { }
