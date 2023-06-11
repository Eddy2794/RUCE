import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizacionRUCEListComponent } from './organizacion/Components/form-list/organizacionruce-list.component';
import { OrganizacionRUCEInsupdComponent } from './organizacion/Components/form-insupd/organizacionruce-insupd.component';


import { OrganizacionRUCEService } from './organizacion/Services/OrganizacionRUCE/organizacionruce-service.service';
import { AutoridadOrganizacionRUCEService } from './autoridades/Services/AutoridadOrganizacionRUCE/autoridad-organizacionruce.service';

import { RefOrganizacionRUCERoutingModule } from './reforganizacionruce-routing.module';

import { SharedModule } from '@app/shared/shared.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { DetallesComponent } from './organizacion/Components/detalles/detalles.component';
import { EncabezadoOrganizacionruceComponent } from './organizacion/Components/encabezado-organizacionruce/encabezado-organizacionruce.component';
import { AutoridadFormListComponent } from './autoridades/Components/form-list/form-list.component';
import { AutoridadInsupdComponent } from './autoridades/Components/form-insupd/insupd.component';

// import { VexAioTableModule } from 'vex-aio-table';

@NgModule({
  declarations: [
    OrganizacionRUCEListComponent,
    OrganizacionRUCEInsupdComponent,
    DetallesComponent,
    EncabezadoOrganizacionruceComponent,
    AutoridadFormListComponent,
    AutoridadInsupdComponent
  ],
  imports: [
    CommonModule,
    RefOrganizacionRUCERoutingModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule
  ],
  providers: [
    OrganizacionRUCEService,
    AutoridadOrganizacionRUCEService,
  ]
})
export class RefOrganizacionRUCEModule { }
