import { RefcategoriaorganizacionInsupdComponent } from './components/form-insupd/refcategoriaorganizacion-insupd/refcategoriaorganizacion-insupd.component';
import { RefcategoriaorganizacionListComponent } from './components/form-list/refcategoriaorganizacion-list/refcategoriaorganizacion-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: RefcategoriaorganizacionListComponent},
      { path: 'add-edit/:id', component: RefcategoriaorganizacionInsupdComponent },
      { path: 'delete/:id', component: RefcategoriaorganizacionInsupdComponent },
      { path: '**', redirectTo: 'listar'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefcategoriaorganizacionRoutingModule { }
