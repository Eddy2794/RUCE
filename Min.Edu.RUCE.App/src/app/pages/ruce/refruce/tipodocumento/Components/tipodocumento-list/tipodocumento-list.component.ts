import { Component, OnInit } from '@angular/core';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { RefTipoDocumentoModel } from '../../../Model/reftipodocumento-model';
import { RefTipoDocumentoService } from '../../../Services/reftipodocumento.service';

@Component({
  selector: 'vex-tipodocumento-list',
  templateUrl: './tipodocumento-list.component.html',
  styleUrls: ['./tipodocumento-list.component.scss']
})
export class TipodocumentoListComponent implements OnInit {

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<RefTipoDocumentoModel>[];

  constructor(
    public tipoDocumentoService: RefTipoDocumentoService,
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
      { label: 'DESCRIPCION', property: 'tipoDocumentoDesc', type: 'text', visible: true },
    ]
  }

}
