import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargosalarialRoutingModule } from './cargosalarial-routing.module';
import { CargosalarialListComponent } from './components/form-list/cargosalarial-list/cargosalarial-list.component';
import { CargosalarialInsupdComponent } from './components/form-insupd/cargosalarial-insupd/cargosalarial-insupd.component';
import { SharedModule } from '../../shared/shared.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';


@NgModule({
  declarations: [
    CargosalarialListComponent,
    CargosalarialInsupdComponent
  ],
  imports: [
    CommonModule,
    CargosalarialRoutingModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule
  ]
})
export class CargosalarialModule { }
