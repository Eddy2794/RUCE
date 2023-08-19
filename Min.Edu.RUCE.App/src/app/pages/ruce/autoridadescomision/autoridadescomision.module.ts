import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';

import { AutoridadescomisionRoutingModule } from './autoridadescomision-routing.module';
import { AutoridadComisionListComponent } from './Components/autoridad-list/autoridad-list.component';
import { AutoridadComisionInsupdComponent } from './Components/autoridad-insupd/autoridad-insupd.component';


@NgModule({
  declarations: [
    AutoridadComisionInsupdComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    AutoridadescomisionRoutingModule
  ]
})
export class AutoridadescomisionModule { }
