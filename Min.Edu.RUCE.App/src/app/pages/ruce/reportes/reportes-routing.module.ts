import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportesListComponent } from './Components/reportes-list/reportes-list.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'listar', component: ReportesListComponent },
    { path: '**', redirectTo: 'listar' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
