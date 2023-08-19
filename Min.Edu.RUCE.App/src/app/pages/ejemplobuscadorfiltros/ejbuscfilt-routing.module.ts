import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjbuscfiltComponent } from './components/ejbuscfilt.component';

const routes: Routes = [
  {
    path: '', component: EjbuscfiltComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EjbuscfiltRoutingModule { }
