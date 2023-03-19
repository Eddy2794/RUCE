import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoridadEstablecimientoComponent } from './Components/autoridad-establecimiento/autoridad-establecimiento.component';
import { EstablecimientoComponent } from './Components/establecimiento/establecimiento.component';

import { EstablecimientoService } from './Services/Establecimiento/establecimiento-service.service';
import { AutoridadEstablecimientoService } from './Services/AutoridadEstablecimiento/autoridad-establecimiento.service';

import { RefEstablecimientoRoutingModule } from './refestablecimiento-routing.module';

import { SharedModule } from '@app/shared/shared.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';

@NgModule({
  declarations: [
    EstablecimientoComponent,
    AutoridadEstablecimientoComponent
  ],
  imports: [
    CommonModule,
    RefEstablecimientoRoutingModule,
  ],
  providers: [
    EstablecimientoService,
    AutoridadEstablecimientoService,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule
  ]
})
export class RefEstablecimientoModule { }
