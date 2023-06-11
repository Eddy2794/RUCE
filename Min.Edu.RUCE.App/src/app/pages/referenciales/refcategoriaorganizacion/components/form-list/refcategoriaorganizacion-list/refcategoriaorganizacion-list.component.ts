import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ColumnOptions, FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { RefCategoriaOrganizacionModel } from '../../../model/refcategoriaorganizacion.model';
import { RefcategoriaorganizacionService } from '../../../services/refcategoriaorganizacion.service';

@Component({
  selector: 'app-refcategoriaorganizacion-list',
  templateUrl: './refcategoriaorganizacion-list.component.html',
  styleUrls: ['./refcategoriaorganizacion-list.component.css']
})
export class RefcategoriaorganizacionListComponent implements OnInit {
  searchOptions!: SearchOptionsGeneric[];
  filtro: FilterOptions = { estaActivo: true };
  columnasVex: TableColumn<RefCategoriaOrganizacionModel>[];

  constructor(public refcategoriaorganizacionService: RefcategoriaorganizacionService, public dialog:MatDialog) { }

  ngOnInit(): void {
    this.setColumns();
    this.setSearchOptions();
  }
  private setColumns() {
    this.columnasVex = [
      { label: 'CÓDIGO', property: 'id', type: 'text', visible: true },
      { label: 'CATEGORÍA ORGANIZACIÓN', property: 'categoriaOrganizacionDesc', type: 'text', visible: true },
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true }
    ]
  }
  private setSearchOptions() {    
    this.searchOptions = [
      new SearchOptionsGeneric({ 
        typeControl: TypeControl.INPUT, 
        typeData: TypeData.NUMBER, 
        name: 'id',  
        label: 'Código', 
        readonly: false
      }),
      new SearchOptionsGeneric({ 
        typeControl: TypeControl.INPUT, 
        typeData: TypeData.TEXT, 
        name: 'categoriaOrganizacionDesc', 
        label: 'Categoría Orgnización', 
        readonly: false
      })
    ]
  }

}
