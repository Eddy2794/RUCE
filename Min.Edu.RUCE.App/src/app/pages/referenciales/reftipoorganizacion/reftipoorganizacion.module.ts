import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReftiporganizacionInsupdComponent } from './components/form-insupd/reftiporganizacion-insupd.component';
import { ReftiporganizacionListComponent } from './components/form-list/reftiporganizacion-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { RefTipoOrganizacionRoutingModule } from './reftipoorganizacion-routing.module';



@NgModule({
  declarations: [
    ReftiporganizacionInsupdComponent,
    ReftiporganizacionListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RefTipoOrganizacionRoutingModule
    
  ]
})
export class ReftipoorganizacionModule { }
