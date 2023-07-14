import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefmodalidaddictadoRoutingModule } from './refmodalidaddictado-routing.module';
import { RefmodalidaddictadoListComponent } from './components/form-list/refmodalidaddictado-list/refmodalidaddictado-list.component';
import { RefmodalidaddictadoInsupdComponent } from './components/form-insupd/refmodalidaddictado-insupd/refmodalidaddictado-insupd.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    RefmodalidaddictadoListComponent,
    RefmodalidaddictadoInsupdComponent
  ],
  imports: [
    CommonModule,
    RefmodalidaddictadoRoutingModule,
    SharedModule
  ]
})
export class RefmodalidaddictadoModule { }
