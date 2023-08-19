import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersoneriaListComponent } from './Components/personeria-list/personeria-list.component';
import { PersoneriaInsupdComponent } from './Components/personeria-insupd/personeria-insupd.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'listar', component: PersoneriaListComponent },
    { path: 'add-edit/:id', component: PersoneriaInsupdComponent },
    { path: 'view/:id', component: PersoneriaInsupdComponent },
    { path: 'delete/:id', component: PersoneriaInsupdComponent },
    { path: '**', redirectTo: 'listar' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersoneriaRoutingModule { }
