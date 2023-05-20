import { EspaciosDirective } from './directives/espacios/espacios.directive';
import { ButtonGroupComponent } from '../../../components/button-group/button-group.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/pages/organismos/shared/material/material.module';

import { TableComponent, TableMapObject } from '@app/components/table/table.component';
import { VerErrorComponent } from '@app/components/ver-error/ver-error.component';
import { SpinnerComponent } from '@app/components/spinner/spinner.component';
import { DialogComponent } from '@app/components/dialog/dialog.component';
import { MayusDirective } from './directives/mayusculas/mayus.directive';
import { SolonumDirective } from './directives/solonumeros/solonum.directive';
import { DynamicFormBuilderComponent } from './dynamic-form-builder/dynamic-form-builder.component';
import { FieldBuilderComponent } from './dynamic-form-builder/field-builder/field-builder.component';
import { TextBoxComponent } from './dynamic-form-builder/atoms/textbox';
import { DropDownComponent } from './dynamic-form-builder/atoms/dropdown';
import { CheckBoxComponent } from './dynamic-form-builder/atoms/checkbox';
import { FileComponent } from './dynamic-form-builder/atoms/file';
import { RadioComponent } from './dynamic-form-builder/atoms/radio';
import { ModalSearchGenericComponent } from '@app/components/modal-search-generic/modal-search-generic.component';
import { SearchButtonGenericComponent } from '@app/components/search-button-generic/search-button-generic.component';
import { ModalEntitySingleSelectComponent } from '@app/components/modal-entity-single-select/modal-entity-single-select.component';
import { InputSearchComponent } from '@app/components/input-search/input-search.component';
import { ButtonNuevoComponent } from '@app/components/button-nuevo/button-nuevo.component';
import { ModalEntityMultipleSelectComponent } from '@app/components/modal-entity-multiple-select/modal-entity-multiple-select.component';
import { AioTableComponent } from '@app/components/aio-table/aio-table.component';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';


@NgModule({
  declarations: [
    TableComponent,
    TableMapObject,
    VerErrorComponent,
    SpinnerComponent,
    DialogComponent,
    DynamicFormBuilderComponent,
    FieldBuilderComponent,
    TextBoxComponent,
    DropDownComponent,
    CheckBoxComponent,
    FileComponent,
    RadioComponent,
    MayusDirective,
    SolonumDirective,
    ButtonGroupComponent,
    ModalSearchGenericComponent,
    SearchButtonGenericComponent,
    ModalEntitySingleSelectComponent,
    InputSearchComponent,    
    ButtonNuevoComponent,
    ModalEntityMultipleSelectComponent,
    AioTableComponent,
    EspaciosDirective
  ],
  providers: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PageLayoutModule,
    BreadcrumbsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TableComponent,
    TableMapObject,
    VerErrorComponent,
    SpinnerComponent,
    DialogComponent,
    DynamicFormBuilderComponent,
    FieldBuilderComponent,
    TextBoxComponent,
    DropDownComponent,
    CheckBoxComponent,
    FileComponent,
    RadioComponent,
    MayusDirective,
    SolonumDirective,
    ButtonGroupComponent,
    ModalSearchGenericComponent,
    SearchButtonGenericComponent,
    ModalEntitySingleSelectComponent,
    InputSearchComponent,    
    ButtonNuevoComponent,
    ModalEntityMultipleSelectComponent,
    AioTableComponent,
    EspaciosDirective
  ]
})
export class SharedModule {
}
