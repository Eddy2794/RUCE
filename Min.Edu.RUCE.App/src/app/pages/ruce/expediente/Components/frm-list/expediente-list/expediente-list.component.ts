import { ExpedienteService } from '../../../Services/expediente.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoridadComisionModel } from '@app/pages/ruce/autoridadescomision/Model/autoridad-comision-model';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';

@Component({
  selector: 'vex-expediente-list',
  templateUrl: './expediente-list.component.html',
  styleUrls: ['./expediente-list.component.scss']
})
export class ExpedienteListComponent implements OnInit {

  @Input() idCooperadora!: number;

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<AutoridadComisionModel>[];

  constructor(private route:ActivatedRoute,
              private expedienteService: ExpedienteService
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
      { label: 'NRO DE EXPEDIENTE', property: 'nroExpediente', type: 'object', visible: true },
      { label: 'CANT. DE OBSERVACIONES.', property: 'fkPersonaRUCE.documento', type: 'object', visible: true },
      { label: 'OBSERVACIUONES', property: 'fkPersonaRUCE.nombre', type: 'object', visible: true },
      { label: 'OBSERVACIUONES RESPODNDIDAS', property: 'fkPersonaRUCE.apellido', type: 'object', visible: true },      
    ]
  }

}
