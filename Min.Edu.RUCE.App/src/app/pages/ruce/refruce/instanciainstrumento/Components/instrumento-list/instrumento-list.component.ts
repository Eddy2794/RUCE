import { Component, OnInit } from '@angular/core';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { RefInstanciaInstrumentoModel } from '../../../Model/refinstanciainstrumento-model';
import { RefinstanciaInstrumentoService } from '../../../Services/refinstanciainstrumento.service';

@Component({
  selector: 'vex-instrumento-list',
  templateUrl: './instrumento-list.component.html',
  styleUrls: ['./instrumento-list.component.scss']
})
export class InstrumentoListComponent implements OnInit {

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<RefInstanciaInstrumentoModel>[];

  constructor(
    public instanciaInstrumentoService: RefinstanciaInstrumentoService,
  ) {

  }

  ngOnInit(): void {
    this.obtenerBusqueda()
  }

  obtenerBusqueda() {
    this.filtro = { estaActivo: true, PageSize: 10};
    this.cargarList();
  }

  cargarList() {
    this.setColumns();
    //this.loadAutoridades();
  }

  private setColumns() {
    this.columnasVex = [
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true },
      { label: 'CODIGO', property: 'id', type: 'object', visible: true },
      { label: 'DESCRIPCION', property: 'InstrumentoDesc', type: 'text', visible: true },
    ]
  }

}
