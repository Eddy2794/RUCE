import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataPage, FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { Subscription } from 'rxjs';
import { CooperadoraModel } from '@app/pages/ruce/refcooperadora/cooperadora/Models/cooperadora-model';
import { AutoridadComisionModel } from '@app/pages/ruce/refcooperadora/autoridades/Model/autoridad-comision-model';
import { PersonaRUCEModel } from '@app/pages/ruce/ref-ruce/Model/persona-ruce-model';
import { RefCargoModel } from '@app/pages/ruce/ref-ruce/Model/refcargo-model';
import { CooperadoraService } from '@app/pages/ruce/refcooperadora/cooperadora/Services/cooperadora.service';
import { AutoridadComisionService } from '@app/pages/ruce/refcooperadora/autoridades/Service/autoridad-comision.service';
import { RefcargoService } from '@app/pages/ruce/ref-ruce/Services/refcargo-service';
import { PersonaruceService } from '@app/pages/ruce/ref-ruce/Services/personaruce-service';

@Component({
  selector: 'vex-autoridad-list',
  templateUrl: './autoridad-list.component.html',
  styleUrls: ['./autoridad-list.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class AutoridadListComponent implements OnInit {

  columnasBusqueda!: TableColumn<CooperadoraModel>[];
  filtroBusqueda: FilterOptions = { PageSize: 10 };
  searchOptionsBusqueda!: SearchOptionsGeneric[];
  frmAutoridades!: FormGroup;

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<AutoridadComisionModel>[];

  autoridadesCooperadora: AutoridadComisionModel[] = [];
  personaRUCE: PersonaRUCEModel[] = [];
  refCargo: RefCargoModel[] = [];

  @Input() idCooperadora!: number;
  @Input() idComision!: number

  constructor(
    public cooperadoraService: CooperadoraService,
    public autoridadService: AutoridadComisionService,
    public refCargoService: RefcargoService,
    public personaRUCEService: PersonaruceService,
  ) { }

  ngOnInit(): void {
    this.obtenerBusqueda()
  }

  obtenerBusqueda() {
    this.filtro = { estaActivo: true, PageSize: 10, filtros:'{"fkComision":"'+this.idComision+'"}'};
    this.cargarList();
  }

  cargarList() {
    this.setColumns();
    //this.loadAutoridades();
  }

  private setColumns() {
    this.columnasVex = [
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true },
      { label: 'CUIL', property: 'fkPersonaRUCE.cuil', type: 'object', visible: true },
      { label: 'DNI', property: 'fkPersonaRUCE.documento', type: 'object', visible: true },
      { label: 'NOMBRE', property: 'fkPersonaRUCE.nombre', type: 'object', visible: true },
      { label: 'APELLIDO', property: 'fkPersonaRUCE.apellido', type: 'object', visible: true },
      { label: 'EMAIL', property: 'fkPersonaRUCE.email', type: 'object', visible: true },
      { label: 'TELEFONO', property: 'fkPersonaRUCE.telefono', type: 'object', visible: true },
      { label: 'CARGO', property: 'fkRefCargo.cargoDesc', type: 'object', visible: true },
      { label: 'INICIO DE CARGO', property: 'inicioCargo', type: 'date', visible: true },
      { label: 'FIN DE CARGO', property: 'finCargo', type: 'date', visible: true },
      
    ]
  }

}
