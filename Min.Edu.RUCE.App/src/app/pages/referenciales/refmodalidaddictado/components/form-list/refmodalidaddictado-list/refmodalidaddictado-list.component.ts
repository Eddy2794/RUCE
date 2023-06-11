import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnOptions, FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';
import { RefModalidadDictadoModel } from '../../../model/refmodalidaddictado.model';
import { RefmodalidaddictadoService } from '../../../services/refmodalidaddictado.service';

@Component({
  selector: 'app-refmodalidaddictado-list',
  templateUrl: './refmodalidaddictado-list.component.html',
  styleUrls: ['./refmodalidaddictado-list.component.css']
})
export class RefmodalidaddictadoListComponent implements OnInit {
  loaading = false;
  rows: any;
  displayedColumns: string[] = ['id', 'modalidadDictadoDesc', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<RefModalidadDictadoModel>([]);
  columns: ColumnOptions[] = [];
  @Input() searchOptions!: SearchOptionsGeneric[];
  filtro: FilterOptions = { estaActivo: true };

  subjectFilter: any;
  subjectSearch: any;
  textoEtiqueta!: string;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(public refmodalidaddictadoService : RefmodalidaddictadoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.setColumns();
    this.setSearchOptions();
  }

  private setColumns(){
    this.columns=[
      new ColumnOptions('id', 'CÓDIGO', ColumnOptions.TYPE_INTEGER),
      new ColumnOptions('modalidadDictadoDesc', 'MODALIDAD DE DICTADO', ColumnOptions.TYPE_TEXT),
      new ColumnOptions('action', 'ACCIONES', ColumnOptions.TYPE_TEXT) 
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
        name: 'modalidadDictadoDesc', 
        label: 'Modalidad de dictado', 
        readonly: false
      })
    ]
  }

}
