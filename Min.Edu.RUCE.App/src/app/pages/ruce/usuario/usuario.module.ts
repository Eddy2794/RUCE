import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioListComponent } from './Components/usuario-list/usuario-list.component';
import { UsuarioInsupdComponent } from './Components/usuario-insupd/usuario-insupd.component';
import { SharedModule } from '@app/shared/shared.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';


@NgModule({
  declarations: [
    UsuarioListComponent,
    UsuarioInsupdComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    UsuarioRoutingModule
  ],
  exports:[
    UsuarioListComponent,
    UsuarioInsupdComponent
  ]
})
export class UsuarioModule { }
