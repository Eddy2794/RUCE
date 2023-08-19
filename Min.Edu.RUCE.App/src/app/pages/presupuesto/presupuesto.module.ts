import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresupuestoRoutingModule } from './presupuesto-routing.module';
import { PresupuestoListComponent } from './components/form-list/presupuesto-list.component';
import { PresupuestoInsUpdComponent } from './components/form-insupd/presupuesto-insupd.component';
import { SharedModule } from '@app/shared/shared.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';


@NgModule({
  declarations: [
    PresupuestoListComponent,
    PresupuestoInsUpdComponent
  ],
  imports: [
    CommonModule,
    PresupuestoRoutingModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule

  ]
})
export class PresupuestoModule { }
