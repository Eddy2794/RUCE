import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefGrupoNivelRoutingModule } from './refgruponivel-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { RefgruponivelListComponent } from './components/form-list/refgruponivel-list.component';
import { RefgruponivelInsupdComponent } from './components/form-insupd/refgruponivel-insupd/refgruponivel-insupd.component';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';


@NgModule({
  declarations: [
    RefgruponivelListComponent,
    RefgruponivelInsupdComponent
  ],
  imports: [
    CommonModule,
    RefGrupoNivelRoutingModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule
  ]
})
export class RefGrupoNivelModule { }
