import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatriculaListComponent } from './Components/form-list/matricula-list/matricula-list.component';
import { MatriculaInsupdComponent } from './Components/form-insupd/matricula-insupd/matricula-insupd.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'listar', component: MatriculaListComponent },
    { path: 'add-edit/:id', component: MatriculaInsupdComponent },
    { path: 'view/:id', component: MatriculaInsupdComponent },
    { path: 'delete/:id', component: MatriculaInsupdComponent },
    { path: '**', redirectTo: 'listar' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatriculasRoutingModule { }
