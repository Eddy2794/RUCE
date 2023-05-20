import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefNivelEducativoRoutingModule } from './refniveleducativo-routing.module';
import { SharedModule } from '@app/pages/organismos/shared/shared.module';
import { RefNivelEducativoListComponent } from './components/form-list/refniveleducativo-list.component';
import { RefNivelEducativoInsupdComponent } from './components/form-insupd/refniveleducativo-insupd.component';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';


@NgModule({
  declarations: [
    RefNivelEducativoListComponent,
    RefNivelEducativoInsupdComponent,
  ],
  imports: [
    CommonModule,
    RefNivelEducativoRoutingModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule
  ]
})
export class RefNivelEducativoModule { }
