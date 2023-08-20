import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';

import { MatriculasRoutingModule } from './matriculas-routing.module';
import { MatriculaInsupdComponent } from './Components/form-insupd/matricula-insupd/matricula-insupd.component';
import { MatriculaListComponent } from './Components/form-list/matricula-list/matricula-list.component';


@NgModule({
  declarations: [MatriculaInsupdComponent, MatriculaListComponent],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    MatriculasRoutingModule
  ],
  exports: [MatriculaInsupdComponent, MatriculaListComponent],
})
export class MatriculasModule { }
