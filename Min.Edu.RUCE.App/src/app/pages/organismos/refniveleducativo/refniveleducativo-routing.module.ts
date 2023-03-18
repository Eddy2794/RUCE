import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RefNivelEducativoInsupdComponent } from './components/form-insupd/refniveleducativo-insupd.component';
import { RefNivelEducativoListComponent } from './components/form-list/refniveleducativo-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: RefNivelEducativoListComponent},
      { path: 'add-edit/:id', component: RefNivelEducativoInsupdComponent },
      { path: 'delete/:id', component: RefNivelEducativoInsupdComponent },
      { path: '**', redirectTo: 'listar'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefNivelEducativoRoutingModule { }
