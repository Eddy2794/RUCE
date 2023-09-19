import { Component, Input, OnInit } from '@angular/core';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { FondoModel } from '../../Models/fondo-model';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { FormGroup } from '@angular/forms';
import { CooperadoraService } from '../../../cooperadora/Services/cooperadora.service';
import { FondoService } from '../../Services/fondo.service';

@Component({
  selector: 'vex-fondo-list',
  templateUrl: './fondo-list.component.html',
  styleUrls: ['./fondo-list.component.scss']
})
export class FondoListComponent implements OnInit {

  columnasBusqueda!: TableColumn<FondoModel>[];
  filtroBusqueda: FilterOptions = { PageSize: 10 };
  searchOptionsBusqueda!: SearchOptionsGeneric[];
  frmFondo!: FormGroup;

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<FondoModel>[];

  fondo: FondoModel[] = [];

  @Input() idCooperadora!: number;

  constructor(
    public cooperadoraService: CooperadoraService,
    public fondoService: FondoService,
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
      { label: 'FONDO', property: 'ref_tipo_fondo.0.tipoFondoDesc', type: 'object', visible: true },
      { label: 'INSCRIPTA', property: 'inscripta', type: 'boolean', visible: true },
      { label: 'VERIFICADA', property: 'verificada', type: 'boolean', visible: true },
      { label: 'FONDO RECIBIDO', property: 'fondoRecibido', type: 'boolean', visible: true },
      { label: 'FONDO RENDIDO', property: 'fondoRendido', type: 'boolean', visible: true },
      { label: 'MONTO', property: 'monto', type: 'pesos', visible: true },
      { label: 'RECIBIDO', property: 'fechaRecibido', type: 'date', visible: true },
      { label: 'RENDIDO', property: 'fechaRendicion', type: 'date', visible: true },
      { label: 'AÑO OTORGADO', property: 'anioOtorgado', type: 'text', visible: true },
    ]
  }

}
