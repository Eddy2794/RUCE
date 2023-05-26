import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WizardEjemploRoutingModule } from './wizard-ejemplo.routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { WizardEjemploComponent } from './wizard-ejemplo.component';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';


@NgModule({
  declarations: [
    WizardEjemploComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WizardEjemploRoutingModule,
    SharedModule,
    SecondaryToolbarModule,
    BreadcrumbsModule
  ]
})
export class WizardEjemploModule { }
