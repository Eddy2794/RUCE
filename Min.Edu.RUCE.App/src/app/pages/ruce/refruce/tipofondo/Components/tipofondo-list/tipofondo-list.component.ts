import { Component, OnInit } from '@angular/core';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { RefTipoFondoModel } from '../../../Model/reftipofondo-model';
import { RefTipoFondoService } from '../../../Services/reftipofondo.service';

@Component({
  selector: 'vex-tipofondo-list',
  templateUrl: './tipofondo-list.component.html',
  styleUrls: ['./tipofondo-list.component.scss']
})
export class TipofondoListComponent implements OnInit {

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<RefTipoFondoModel>[];

  constructor(
    public tipoFondoService: RefTipoFondoService,
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
      { label: 'DESCRIPCION', property: 'tipoFondoDesc', type: 'text', visible: true },
    ]
  }

}
