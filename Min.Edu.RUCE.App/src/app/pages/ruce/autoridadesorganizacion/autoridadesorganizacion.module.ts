import { AutoridadOrganizacionListComponent } from './Components/autoridad-list/autoridad-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';

import { AutoridadesorganizacionRoutingModule } from './autoridadesorganizacion-routing.module';
import { AutoridadOrganizacionInsupdComponent } from './Components/form-insupd/insupd.component';


@NgModule({
  declarations: [
    AutoridadOrganizacionInsupdComponent,
    AutoridadOrganizacionListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    AutoridadesorganizacionRoutingModule
  ],
  exports: [
    AutoridadOrganizacionListComponent,
    AutoridadOrganizacionInsupdComponent
  ]
})
export class AutoridadesorganizacionModule { }
