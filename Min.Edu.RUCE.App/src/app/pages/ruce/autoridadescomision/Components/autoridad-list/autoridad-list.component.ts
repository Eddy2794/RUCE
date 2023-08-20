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
import { PersonaRUCEModel } from '@app/pages/ruce/refruce/Model/persona-ruce-model';
import { RefCargoModel } from '@app/pages/ruce/refruce/Model/refcargo-model';
import { AutoridadComisionModel } from '../../Model/autoridad-comision-model';
import { AutoridadComisionService } from '../../Service/autoridad-comision.service';
import { RefcargoService } from '@app/pages/ruce/refruce/Services/refcargo-service';
import { PersonaruceService } from '@app/pages/ruce/refruce/Services/personaruce-service';
import { ObserverComisionService } from '@app/pages/ruce/comision/Services/observer-comision.service';
import { CooperadoraModel } from '@app/pages/ruce/cooperadora/Models/cooperadora-model';
import { CooperadoraService } from '@app/pages/ruce/cooperadora/Services/cooperadora.service';

@Component({
  selector: 'vex-autoridad-list',
  templateUrl: './autoridad-list.component.html',
  styleUrls: ['./autoridad-list.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class AutoridadComisionListComponent implements OnInit, OnDestroy {

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
  @Input() idComision!: number;

 

  suscriptionIdComision: Subscription;

  constructor(
    public cooperadoraService: CooperadoraService,
    public autoridadService: AutoridadComisionService,
    public refCargoService: RefcargoService,
    public personaRUCEService: PersonaruceService,
    protected observerIdComision: ObserverComisionService,
  ) {
    this.suscriptionIdComision = this.observerIdComision.castIdIdComision.subscribe((value)=>{
      this.idComision = value;
    });
  }
  ngOnDestroy(): void {
    this.suscriptionIdComision.unsubscribe();
  }

  ngOnInit(): void {
    this.obtenerBusqueda()
    console.log(this.idCooperadora);
  }

  obtenerBusqueda() {
    this.filtro = { estaActivo: true, PageSize: 10, fkComision: this.idComision};
    this.cargarList();
  }

  cargarList() {
    this.setColumns();
    //this.loadAutoridades();
  }

  private setColumns() {
    this.columnasVex = [
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true },
      { label: 'CUIL', property: 'persona_r_u_c_e.0.cuil', type: 'object', visible: true },
      { label: 'DNI', property: 'persona_r_u_c_e.0.documento', type: 'object', visible: true },
      { label: 'NOMBRE', property: 'persona_r_u_c_e.0.nombre', type: 'object', visible: true },
      { label: 'APELLIDO', property: 'persona_r_u_c_e.0.apellido', type: 'object', visible: true },
      { label: 'EMAIL', property: 'persona_r_u_c_e.0.email', type: 'object', visible: true },
      { label: 'TELEFONO', property: 'persona_r_u_c_e.0.telefono', type: 'object', visible: true },
      { label: 'CARGO', property: 'ref_cargo.0.cargoDesc', type: 'object', visible: true },
      { label: 'INICIO DE CARGO', property: 'inicioCargo', type: 'date', visible: true },
      { label: 'FIN DE CARGO', property: 'finCargo', type: 'date', visible: true },
      
    ]
  }

  private setSearchOptions() {
    this.searchOptions = [
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.NUMBER,
        name: 'id',
        label: 'Codigo',
        readonly: false,
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: 'planEstudioDescContains',
        label: 'Plan Estudio',
        readonly: false,
      }),
      // new SearchOptionsGeneric({
      //   typeControl: TypeControl.SELECT,
      //   typeData: TypeData.TEXT,
      //   name: 'idPropuestaFormativa',
      //   label: 'Propuesta Formativa',
      //   readonly: false,
      //   value: this.propFormModel,
      //   property: 'propuestaFormativaDesc'
      // }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.SELECT,
        typeData: TypeData.TEXT,
        name: 'idRefNivelEducativo',
        label: 'Nivel Educativo',
        readonly: false,
        value: this.autoridadesCooperadora,
        property: 'nivelEducativoDesc'
      }),
      // new SearchOptionsGeneric({
      //   typeControl: TypeControl.SELECT,
      //   typeData: TypeData.TEXT,
      //   name: 'idRefEspecialidad',
      //   label: 'Orientacion',
      //   readonly: false,
      //   value: this.refEspecialidad,
      //   property: 'especialidadDesc'
      // }),
      // new SearchOptionsGeneric({
      //   typeControl: TypeControl.SELECT,
      //   typeData: TypeData.TEXT,
      //   name: 'idRefEstadoPlanUnidad',
      //   label: 'Estado',
      //   readonly: false,
      //   value: this.refEstadoPlanUnidad,
      //   property: 'estadoPlanUnidadDesc'
      // }),
    ]
  }

}
