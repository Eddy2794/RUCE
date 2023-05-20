import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoridadEstablecimientoComponent } from './Components/autoridad-establecimiento/autoridad-establecimiento.component';
import { EstablecimientoListComponent } from './Components/establecimiento/form-list/establecimiento-list.component';
import { EstablecimientoInsupdComponent } from './Components/establecimiento/form-insupd/establecimiento-insupd.component';

import { EstablecimientoService } from './Services/Establecimiento/establecimiento-service.service';
import { AutoridadEstablecimientoService } from './Services/AutoridadEstablecimiento/autoridad-establecimiento.service';

import { RefEstablecimientoRoutingModule } from './refestablecimiento-routing.module';

import { SharedModule } from '@app/pages/organismos/shared/shared.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';

// import { VexAioTableModule } from 'vex-aio-table';

@NgModule({
  declarations: [
    EstablecimientoListComponent,
    EstablecimientoInsupdComponent,
    AutoridadEstablecimientoComponent
  ],
  imports: [
    CommonModule,
    RefEstablecimientoRoutingModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule
  ],
  providers: [
    EstablecimientoService,
    AutoridadEstablecimientoService,
  ]
})
export class RefEstablecimientoModule { }
