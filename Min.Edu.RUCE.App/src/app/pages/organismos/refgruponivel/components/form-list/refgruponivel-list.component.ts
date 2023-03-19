import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnOptions, FilterOptions } from '@app/shared/utils';
import { RefGrupoNivelModel } from '@app/pages/organismos/refgruponivel/model/refgruponivel.model';
import { RefGrupoNivelService } from '@app/pages/organismos/refgruponivel/services/refgruponivel.service';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';


@Component({
  selector: 'app-refgruponivel-list',
  templateUrl: './refgruponivel-list.component.html',
  styleUrls: ['./refgruponivel-list.component.css']
})
export class RefgruponivelListComponent implements OnInit {
  
  searchOptions!: SearchOptionsGeneric[];
  filtro: FilterOptions = { estaActivo: true };
  refGrupoNivelModel: RefGrupoNivelModel[] = [];
  columnasVex: TableColumn<RefGrupoNivelModel>[];

  constructor(public grupoNivelService: RefGrupoNivelService,
              public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.setColumns();
    this.setSearchOptions();
  }

  private setColumns() {
    /*this.columns = [
      new ColumnOptions('id', 'ID', ColumnOptions.TYPE_INTEGER),
      new ColumnOptions('grupoDesc', 'GRUPO NIVEL', ColumnOptions.TYPE_TEXT),
      new ColumnOptions('actions', 'ACCIONES', ColumnOptions.TYPE_TEXT)] */
      this.columnasVex = [
        { label: 'CÓDIGO', property: 'id', type: 'text', visible: true },
        { label: 'GRUPO NIVEL', property: 'grupoDesc', type: 'text', visible: true },
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
        name: 'grupoDesc', 
        label: 'Grupo Nivel', 
        readonly: false
      }),
      
    ]
  }

}
