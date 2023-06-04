import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizacionRUCEListComponent } from './Components/form-list/organizacionruce-list.component';
import { OrganizacionRUCEInsupdComponent } from './Components/form-insupd/organizacionruce-insupd.component';


import { OrganizacionRUCEService } from './Services/OrganizacionRUCE/organizacionruce-service.service';
import { AutoridadOrganizacionRUCEService } from './Services/AutoridadOrganizacionRUCE/autoridad-organizacionruce.service';

import { RefOrganizacionRUCERoutingModule } from './reforganizacionruce-routing.module';

import { SharedModule } from '@app/shared/shared.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { DetallesComponent } from './Components/detalles/detalles.component';

// import { VexAioTableModule } from 'vex-aio-table';

@NgModule({
  declarations: [
    OrganizacionRUCEListComponent,
    OrganizacionRUCEInsupdComponent,
    DetallesComponent,
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
