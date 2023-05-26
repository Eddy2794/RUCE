import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RefGrupoNivelService } from '@app/pages/organismos/refgruponivel/services/refgruponivel.service';
import { DataPage, FilterOptions } from '@app/shared/utils';
import { RefNivelEducativoModel } from '@app/pages/organismos/refniveleducativo/model/refniveleducativo.model';
import { RefNivelEducativoService } from '@app/pages/organismos/refniveleducativo/services/refniveleducativo.service';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { RefGrupoNivelModel } from '@app/pages/organismos/refgruponivel/model/refgruponivel.model';


@Component({
  selector: 'app-refniveleducativo-list',
  templateUrl: './refniveleducativo-list.component.html',
  styleUrls: ['./refniveleducativo-list.component.css']
})
export class RefNivelEducativoListComponent implements OnInit {

  searchOptions!: SearchOptionsGeneric[];
  filtro: FilterOptions = { estaActivo: true };
  refGrupoNivel: RefGrupoNivelModel[] = [];
  columnasVex: TableColumn<RefNivelEducativoModel>[];
  
  constructor(  public refNivelEducativoService: RefNivelEducativoService,
                private refGrupoNivelService: RefGrupoNivelService,
                public dialog: MatDialog,
                ) { }

  ngOnInit(): void {
    this.setColumns();
    this.loadGruposNivel();    
  }



  private setColumns() {
    // this.columns = [
    //   new ColumnOptions('id', 'CÓDIGO', ColumnOptions.TYPE_INTEGER, undefined),
    //   new ColumnOptions('nivelEducativoDesc', 'NIVEL EDUCATIVO', ColumnOptions.TYPE_TEXT, undefined),
    //   new ColumnOptions('refGrupoNivel.grupoDesc', 'GRUPO NIVEL EDUCATIVO', ColumnOptions.TYPE_OBJECT, undefined),
    //   new ColumnOptions('actions', 'ACCIONES', ColumnOptions.TYPE_ACTIONS, undefined)
    // ]    
    this.columnasVex = [
      { label: 'CÓDIGO', property: 'id', type: 'text', visible: true },
      { label: 'NIVEL EDUCATIVO', property: 'nivelEducativoDesc', type: 'text', visible: true },
      { label: 'GRUPO NIVEL EDUCATIVO', property: 'refGrupoNivel.grupoDesc', type: 'object', visible: true },
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true }
    ]

  }
  
  loadGruposNivel() {
    const filtroGrupoNivel: FilterOptions = { estaActivo: true }
    this.refGrupoNivelService.filter(filtroGrupoNivel).subscribe((resp: DataPage<RefGrupoNivelModel>) => {            
      this.refGrupoNivel = resp.entities || [];
      this.setSearchOptions();
    });
  }
  
  private setSearchOptions() {
    this.searchOptions = [
      new SearchOptionsGeneric({ 
        typeControl: TypeControl.INPUT, 
        typeData: TypeData.TEXT, 
        name: 'DescContains', 
        label: 'descripcion', 
        readonly: false
      }),
      new SearchOptionsGeneric({ 
        typeControl: TypeControl.INPUT, 
        typeData: TypeData.NUMBER, 
        name: 'Id',  
        label: 'Id', 
        readonly: false
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.CHECKBOX,
        typeData: TypeData.TEXT,
        name: 'CheckBox',
        label: 'check box',
        readonly: false
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.SELECT, 
        typeData: TypeData.TEXT, 
        name: 'idRefGrupoNivel', 
        label: 'Grupo Nivel', 
        readonly: false, 
        value: this.refGrupoNivel, 
        property: 'grupoDesc'
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.RADIO, 
        typeData: TypeData.TEXT, 
        name: 'idRefGrupoNivel', 
        label: 'Grupo Nivel', 
        readonly: false, 
        value: [{texto: 'SI', id: true}, {texto: 'NO', id: false}, {texto: 'TODOS', id: undefined}], 
        property: 'texto'
      }),

      new SearchOptionsGeneric({
        typeControl: TypeControl.MODAL_SINGLE_SELECTION, 
        typeData: TypeData.TEXT, 
        name: 'idRefGrupoNivel', 
        label: 'Grupo Nivel', 
        readonly: false, 
        value: this.refGrupoNivel, 
        property: 'grupoDesc'
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.DATEPICKER,
        name: 'fechaDesde',
        label: 'Fecha',
        readonly: false,
        value: new Date(2022,5,15)
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.RANGEDATEPICKER,
        name: 'rangofechas',
        label: 'Fechas Desde-Hasta',
        readonly: false,
        value: {},        
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.MODAL_MULTIPLE_SELECTION,
        name: 'idRefGrupoNivelArray',
        label: 'Grupo Nivel Multiple',
        value: this.refGrupoNivel,
        property: 'grupoDesc'
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.MODAL_MULTIPLE_SELECTION,
        name: 'idRefGrupoNivelArray1',
        label: 'Grupo Nivel Multiple1',
        value: this.refGrupoNivel,
        property: 'grupoDesc'
      })
    ]
  }


}



