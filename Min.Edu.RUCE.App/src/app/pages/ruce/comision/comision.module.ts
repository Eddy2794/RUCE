import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';

import { ComisionRoutingModule } from './comision-routing.module';
import { ComisionInsupdComponent } from './Components/frm-insupd/comision-insupd/comision-insupd.component';
import { AutoridadComisionListComponent } from '../autoridadescomision/Components/autoridad-list/autoridad-list.component';
import { EncabezadoComisionComponent } from './Components/encabezado-comision/encabezado-comision.component';


@NgModule({
  declarations: [
    ComisionInsupdComponent,
    AutoridadComisionListComponent,
    EncabezadoComisionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    ComisionRoutingModule,
    AutoridadComisionListComponent,
  ]
})
export class ComisionModule { }
