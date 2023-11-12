import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { InvoiceComponent } from './invoice.component';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
  {
    path: '',
    children: [
      { path: 'view', component: InvoiceComponent },
      { path: 'view/:id', component: InvoiceComponent },
      { path: '**', redirectTo: '/pages/inicio' }
    ],
    data: {
      toolbarShadowEnabled: true,
      containerEnabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class InvoiceRoutingModule {
}
