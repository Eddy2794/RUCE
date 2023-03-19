import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstablecimientoComponent } from './Components/establecimiento/establecimiento.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: EstablecimientoComponent},
    //   { path: 'add-edit/:id', component: RefgruponivelInsupdComponent },
    //   { path: 'delete/:id', component: RefgruponivelInsupdComponent },
      { path: '**', redirectTo: 'listar' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefEstablecimientoRoutingModule { }