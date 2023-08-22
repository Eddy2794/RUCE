import { Component, OnInit } from '@angular/core';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { RefTipoAsociacionModel } from '../../../Model/reftipoasociacion-model';
import { RefTipoAsociacionService } from '../../../Services/reftipoasociacion.service';

@Component({
  selector: 'vex-tipoasociacion-list',
  templateUrl: './tipoasociacion-list.component.html',
  styleUrls: ['./tipoasociacion-list.component.scss']
})
export class TipoasociacionListComponent implements OnInit {

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<RefTipoAsociacionModel>[];

  constructor(
    public tipoAsociacionService: RefTipoAsociacionService,
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
      { label: 'DESCRIPCION', property: 'tipoAsociacionDesc', type: 'text', visible: true },
    ]
  }

}
