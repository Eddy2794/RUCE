import { MovimientoExpedienteService } from './../../../Services/movimiento-expediente.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoridadCooperadoraModel } from '@app/pages/ruce/refcooperadora/cooperadora/Models/AutoridadCooperadora/autoridad-cooperadora-model';
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
  columnasVex: TableColumn<AutoridadCooperadoraModel>[];

  constructor(private route:ActivatedRoute,
              protected movimientoExpedienteService: MovimientoExpedienteService
  ) { }

  ngOnInit(): void {
  }

  obtenerBusqueda() {
    this.filtro = { estaActivo: true, PageSize: 10, filtros:'{"fkCooperadora":"'+this.idCooperadora+'"}'};
    this.cargarList();
  }

  cargarList() {
    this.setColumns();
  }

  private setColumns() {
    this.columnasVex = [
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true },
      { label: 'NRO EXPEDIENTE', property: 'nroExpediente', type: 'object', visible: true },
      { label: 'INSTANCIA INSTRUMENTO', property: 'fkPersonaRUCE.documento', type: 'object', visible: true },
      { label: 'OBSERVACIUONES', property: 'fkPersonaRUCE.nombre', type: 'object', visible: true },
      { label: 'OBSERVACIUONES RESPODNDIDAS', property: 'fkPersonaRUCE.apellido', type: 'object', visible: true },      
    ]
  }
}
