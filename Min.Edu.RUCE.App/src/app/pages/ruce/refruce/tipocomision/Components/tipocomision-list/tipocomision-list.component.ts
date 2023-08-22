import { Component, OnInit } from '@angular/core';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { ReftipocomisionModel } from '../../../Model/reftipocomision-model';
import { ReftipocomisionService } from '../../../Services/reftipocomision.service';

@Component({
  selector: 'vex-tipocomision-list',
  templateUrl: './tipocomision-list.component.html',
  styleUrls: ['./tipocomision-list.component.scss']
})
export class TipocomisionListComponent implements OnInit {

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<ReftipocomisionModel>[];

  constructor(
    public tipoComisionService: ReftipocomisionService,
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
      { label: 'DESCRIPCION', property: 'tipoComisionDesc', type: 'text', visible: true },
    ]
  }

}
