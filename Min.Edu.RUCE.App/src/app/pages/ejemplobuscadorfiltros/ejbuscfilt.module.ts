import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EjbuscfiltRoutingModule } from './ejbuscfilt-routing.module';
import { EjbuscfiltComponent } from './components/ejbuscfilt.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    EjbuscfiltComponent
  ],
  imports: [
    CommonModule,
    EjbuscfiltRoutingModule,
    SharedModule
  ]
})
export class EjbuscfiltModule { }
