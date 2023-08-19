import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnOptions, FilterOptions } from '@app/shared/utils';
import { SearchOptions } from '@app/shared/utils/search-options';
import { RefJornadaModel } from '../../../model/refjornada.model';
import { RefjornadaService } from '../../../services/refjornada.service';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';

@Component({
  selector: 'app-refjornada-list',
  templateUrl: './refjornada-list.component.html',
  styleUrls: ['./refjornada-list.component.css']
})
export class RefjornadaListComponent implements OnInit {
  
  searchOptions!: SearchOptionsGeneric[];
  filtro: FilterOptions = { estaActivo: true };
  refJornadaModel: RefJornadaModel[] = [];
  columnasVex: TableColumn<RefJornadaModel>[];
  
  constructor(public refjornadaService: RefjornadaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.setColumns();
    this.setSearchOptions();
  }

  private setColumns() {
    /* this.columns = [
      new ColumnOptions('id', 'ID', ColumnOptions.TYPE_INTEGER),
      new ColumnOptions('jornadaDesc', 'JORNADA', ColumnOptions.TYPE_TEXT),
      new ColumnOptions('nemotecnico', 'NEMOTÉCNICO', ColumnOptions.TYPE_TEXT),
      new ColumnOptions('action', 'ACCIONES', ColumnOptions.TYPE_TEXT)
    ] */
    this.columnasVex = [
      { label: 'CÓDIGO', property: 'id', type: 'text', visible: true },
      { label: 'JORNADA', property: 'jornadaDesc', type: 'text', visible: true },
      { label: 'NEMOTÉCNICO', property: 'nemotecnico', type: 'text', visible: true },
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
        name: 'jornadaDesc', 
        label: 'Jornada', 
        readonly: false       
      }),
      new SearchOptionsGeneric({ 
        typeControl: TypeControl.INPUT, 
        typeData: TypeData.TEXT, 
        name: 'nemotecnico', 
        label: 'Nemotécnico', 
        readonly: false       
      }),
    ]
  }
}
