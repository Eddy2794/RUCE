import { SharedModule } from '@app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefjornadaRoutingModule } from './refjornada-routing.module';
import { RefjornadaInsupdComponent } from './components/form-insupd/refjornada-insupd/refjornada-insupd.component';
import { RefjornadaListComponent } from './components/form-list/refjornada-list/refjornada-list.component';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';


@NgModule({
  declarations: [
    RefjornadaInsupdComponent,
    RefjornadaListComponent
  ],
  imports: [
    CommonModule,
    RefjornadaRoutingModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule
  ]
})
export class RefjornadaModule { }
