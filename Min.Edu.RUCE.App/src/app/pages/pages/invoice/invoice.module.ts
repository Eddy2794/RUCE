import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { MatIconModule } from '@angular/material/icon';
import { WidgetTableModule } from 'src/@vex/components/widgets/widget-table/widget-table.module';
import { FormListAutoridadComponent } from './form-list-autoridad/form-list-autoridad.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [InvoiceComponent, FormListAutoridadComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,

    MatIconModule,
    MatTableModule
  ]
})
export class InvoiceModule {
}
