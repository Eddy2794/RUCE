import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlazaRoutingModule } from './plaza-routing.module';
import { PlazaInsupdComponent } from './components/form-insupd/plaza-insupd/plaza-insupd.component';
import { PlazaListComponent } from './components/form-list/plaza-list/plaza-list.component';
import { FmplazacreateComponent } from './components/fmplazacreate/fmplazacreate.component';
import { FmplazaencabezadoComponent } from './components/fmplazaencabezado/fmplazaencabezado.component';
import { FmplazadatoscomplementariosComponent } from './components/fmplazadatoscomplementarios/fmplazadatoscomplementarios.component';
import { SharedModule } from '@app/shared/shared.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';


@NgModule({
  declarations: [
    PlazaInsupdComponent,
    PlazaListComponent,
    FmplazacreateComponent,
    FmplazaencabezadoComponent,
    FmplazadatoscomplementariosComponent
  ],
  imports: [
    CommonModule,
    PlazaRoutingModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
  ]
})
export class PlazaModule { }
