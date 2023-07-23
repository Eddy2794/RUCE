import { MovimientoExpedienteService } from './../../../Services/movimiento-expediente.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoridadComisionModel } from '@app/pages/ruce/refcooperadora/comision/Models/autoridad-comision-model';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';

@Component({
  selector: 'vex-movimiento-expediente-list',
  templateUrl: './movimiento-expediente-list.component.html',
  styleUrls: ['./movimiento-expediente-list.component.scss']
})
export class MovimientoExpedienteListComponent implements OnInit {
  @Input() idCooperadora!: number;

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<AutoridadComisionModel>[];

  constructor(private route:ActivatedRoute,
              protected movimientoExpedienteService: MovimientoExpedienteService
  ) { }

  ngOnInit(): void {
  }

  obtenerBusqueda() {
    this.filtro = { estaActivo: true, PageSize: 10, filtros:'{"fkExpediente":"'+this.idCooperadora+'"}'};
    this.cargarList();
  }

  cargarList() {
    this.setColumns();
  }

  private setColumns() {
    this.columnasVex = [
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true },
      { label: 'NRO EXPEDIENTE', property: 'nroExpediente', type: 'text', visible: true },
      { label: 'INSTANCIA INSTRUMENTO', property: 'fkInstanciaInstrumento.instrumentoDesc', type: 'object', visible: true },
      { label: 'OBSERVACIONES', property: 'cantObservaciones', type: 'text', visible: true },
      { label: 'OBSERVACIUONES RESPODNDIDAS', property: 'observacionesRespondidas', type: 'text', visible: true },
    ]
  }
}
