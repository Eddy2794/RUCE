import { Component, OnInit } from '@angular/core';
import { RefCargoModel } from '../../../Model/refcargo-model';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { FormGroup } from '@angular/forms';
import { RefcargoService } from '../../../Services/refcargo-service';

@Component({
  selector: 'vex-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.scss']
})
export class CargoListComponent implements OnInit {

  // columnasBusqueda!: TableColumn<RefCargoModel>[];
  // filtroBusqueda: FilterOptions = { PageSize: 10 };
  // searchOptionsBusqueda!: SearchOptionsGeneric[];
  // frmFondo!: FormGroup;

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<RefCargoModel>[];

  constructor(
    public cargoService: RefcargoService,
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
      { label: 'DESCRIPCION', property: 'cargoDesc', type: 'text', visible: true },
    ]
  }

}
