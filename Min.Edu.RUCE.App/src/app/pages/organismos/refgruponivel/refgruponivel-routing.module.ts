
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RefgruponivelInsupdComponent } from './components/form-insupd/refgruponivel-insupd/refgruponivel-insupd.component';
import { RefgruponivelListComponent } from './components/form-list/refgruponivel-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: RefgruponivelListComponent },
      { path: 'add-edit/:id', component: RefgruponivelInsupdComponent },
      { path: 'delete/:id', component: RefgruponivelInsupdComponent },
      { path: '**', redirectTo: 'listar' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefGrupoNivelRoutingModule { }
