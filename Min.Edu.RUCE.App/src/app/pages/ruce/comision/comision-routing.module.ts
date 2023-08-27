import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComisionInsupdComponent } from './Components/frm-insupd/comision-insupd/comision-insupd.component';

const routes: Routes = [{
  path: '',
  children: [
    //{ path: 'listar', component:  },
    { path: 'add-edit/:id', component: ComisionInsupdComponent },
    { path: 'view/:id', component: ComisionInsupdComponent },
    { path: 'delete/:id', component: ComisionInsupdComponent },
    //{ path: '**', redirectTo: 'listar' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComisionRoutingModule { }
