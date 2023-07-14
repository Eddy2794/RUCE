import { SecondaryToolbarModule } from './../../../@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from './../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from './../../../@vex/components/page-layout/page-layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargofuncionalListComponent } from './components/form-list/cargofuncional-list/cargofuncional-list.component';
import { CargofuncionalRoutingModule } from '../cargofuncional/cargofuncional-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { CargofuncionalInsupdComponent } from './components/form-insupd/cargofuncional-insupd/cargofuncional-insupd.component';



@NgModule({
  declarations: [
    CargofuncionalListComponent,
    CargofuncionalInsupdComponent
  ],
  imports: [
    CommonModule,
    CargofuncionalRoutingModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule
  ]
})
export class CargofuncionalModule { }
