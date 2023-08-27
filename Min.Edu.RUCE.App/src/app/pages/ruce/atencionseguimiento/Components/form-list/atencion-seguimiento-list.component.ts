import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { AtencionSeguimientoModel } from '../../Model/atencion-seguimiento-model';
import { CooperadoraService } from '../../../cooperadora/Services/cooperadora.service';
import { AtencionSeguimientoService } from '../../Service/atencion-seguimiento.service';

@Component({
  selector: 'vex-atencion-seguimiento-list',
  templateUrl: './atencion-seguimiento-list.component.html',
  styleUrls: ['./atencion-seguimiento-list.component.scss']
})
export class AtencionSeguimientoListComponent implements OnInit {

  columnasBusqueda!: TableColumn<AtencionSeguimientoModel>[];
  filtroBusqueda: FilterOptions = { PageSize: 10 };
  searchOptionsBusqueda!: SearchOptionsGeneric[];
  frmAtencionSeguimiento!: FormGroup;

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<AtencionSeguimientoModel>[];

  atencionSeguimiento: AtencionSeguimientoModel[] = [];

  @Input() idCooperadora!: number;

  constructor(
    public cooperadoraService: CooperadoraService,
    public atencionSeguimientoService: AtencionSeguimientoService,
  ) {

  }

  ngOnInit(): void {
    this.obtenerBusqueda()
  }

  obtenerBusqueda() {
    this.filtro = { estaActivo: true, PageSize: 10, fkCooperadora: this.idCooperadora};
    this.cargarList();
  }

  cargarList() {
    this.setColumns();
    //this.loadAutoridades();
  }

  private setColumns() {
    this.columnasVex = [
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true },
      { label: 'USUARIO', property: 'usuario', type: 'object', visible: true },
      { label: 'LLAMADAS', property: 'llamadas', type: 'text', visible: true },
      { label: 'MENSAJES', property: 'mensajes', type: 'text', visible: true },
      { label: 'EMAIL ENVIADOS', property: 'emailEnviados', type: 'text', visible: true },
      { label: 'ATENCION EN OFICINAS', property: 'atencionOficina', type: 'text', visible: true },
      { label: 'ATENCION TERRITORIAL', property: 'atencionTerritorial', type: 'text', visible: true },
      { label: 'OBSERVACIONES', property: 'observacion', type: 'text', visible: true },
    ]
  }

}
