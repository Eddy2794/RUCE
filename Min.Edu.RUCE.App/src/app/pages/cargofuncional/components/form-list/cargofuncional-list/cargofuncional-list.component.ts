import { ReftipofuncionService } from './../../../../referenciales/reftipofuncion/services/reftipofuncion.service';
import { CargoFuncionalModel } from './../../../model/cargofuncional.model';
import { RefTipoFuncionModel } from './../../../../referenciales/reftipofuncion/model/reftipofuncion.model';
import { MatDialog } from '@angular/material/dialog';
import { CargofuncionalService } from './../../../services/cargofuncional.service';
import { TableColumn } from './../../../../../../@vex/interfaces/table-column.interface';
import { Component, OnInit } from '@angular/core';
import { DataPage, FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';

@Component({
  selector: 'vex-cargofuncional-list',
  templateUrl: './cargofuncional-list.component.html',
  styleUrls: ['./cargofuncional-list.component.scss']
})
export class CargofuncionalListComponent implements OnInit {
  searchOptions!: SearchOptionsGeneric[];
  filtro: FilterOptions = { estaActivo: true }
  columnas: TableColumn<CargoFuncionalModel>[];
  refTipoFuncion: RefTipoFuncionModel[] = [];

  constructor(
    public cargoFuncionalService: CargofuncionalService,
    public reftipofuncionService: ReftipofuncionService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setColumns();
    this.load();
  }

  private setColumns() {
    this.columnas = [
      { label: 'CÓDIGO', property: 'id', type: 'text', visible: true },
      { label: 'CARGO FUNCIONAL', property: 'cargoFuncionalDesc', type: 'text', visible: true },
      { label: 'TIPO DE FUNCIÓN', property: 'refTipoFuncion.tipoFuncionDesc', type: 'object', visible: true },
      { label: 'ORDEN VISUAL', property: 'ordenVisual', type: 'text', visible: true },
      { label: 'JERARQUICO', property: 'esJerarquico', type: 'boolean', visible: true },
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true },
    ]
  }

  load() {
    const filtroTipoFuncion: FilterOptions = { estaActivo: true, SortProperties: 'tipoFuncionDesc', PageSize: 1000 };
    this.reftipofuncionService.filter(filtroTipoFuncion).subscribe((resp: DataPage<RefTipoFuncionModel>) => {
      this.refTipoFuncion = resp.entities;
      this.setSearchOptions();
    });
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
        name: 'cargoFuncionalDescContains',
        label: 'Cargo Funcional',
        readonly: false
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.SELECT,
        typeData: TypeData.TEXT,
        name: 'idRefTipoFuncion',
        label: 'Tipo de Funcion',
        readonly: false,
        value: this.refTipoFuncion,
        property: 'tipoFuncionDesc'
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.RADIO,
        typeData: TypeData.TEXT,
        name: 'esJerarquico',
        label: 'Jerarquico',
        readonly: false,
        value: [{ texto: 'TODOS', id: undefined }, { texto: 'SI', id: true }, { texto: 'NO', id: false }],
        property: 'texto'
      }),
    ]
  }

}
