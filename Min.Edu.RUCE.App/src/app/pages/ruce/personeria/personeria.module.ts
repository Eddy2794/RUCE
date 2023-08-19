import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';

import { PersoneriaRoutingModule } from './personeria-routing.module';
import { InsupdPersoneriaComponent } from './Components/insupd-personeria/insupd-personeria.component';


@NgModule({
  declarations: [
    InsupdPersoneriaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    PersoneriaRoutingModule
  ]
})
export class PersoneriaModule { }
