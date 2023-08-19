import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KioscoListComponent } from './Components/kiosco-list/kiosco-list.component';
import { KioscoInsupdComponent } from './Components/kiosco-insupd/kiosco-insupd.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'listar', component: KioscoListComponent },
    { path: 'add-edit/:id', component: KioscoInsupdComponent },
    { path: 'view/:id', component: KioscoInsupdComponent },
    { path: 'delete/:id', component: KioscoInsupdComponent },
    { path: '**', redirectTo: 'listar' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KioscoRoutingModule { }
