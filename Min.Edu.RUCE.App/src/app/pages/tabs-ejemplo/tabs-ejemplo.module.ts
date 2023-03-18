import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsEjemploRoutingModule } from './tabs-ejemplo-routing.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { TabsEjemploComponent } from './tabs-ejemplo.component';
import { SharedModule } from '@app/shared/shared.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';


@NgModule({
  declarations: [
    TabsEjemploComponent
  ],
  imports: [
    CommonModule,
    TabsEjemploRoutingModule,
    SharedModule,
    PageLayoutModule,
    SecondaryToolbarModule,
    BreadcrumbsModule
  ],

})
export class TabsEjemploModule { }
