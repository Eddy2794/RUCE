 import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RefniveleducativoModel } from '@app/pages/referenciales/refniveleducativo/model/refniveleducativo.model';
import { DataPage, FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { RefJornadaModel } from '@app/pages/referenciales/refjornada/model/refjornada.model';
import { RefjornadaService } from '@app/pages/referenciales/refjornada/services/refjornada.service';
import { RefEspecialidadModel } from '@app/pages/referenciales/refespecialidad/model/refespecialidad.model';
import { RefespecialidadService } from '@app/pages/referenciales/refespecialidad/services/refespecialidad.service';
import { Subscription } from 'rxjs';
import { ObserverValueService } from '@app/pages/plaza/services/observervalue.service';
import { RefCargoModel } from '@app/pages/ruce/refruce/Model/refcargo-model';
import { PersonaRUCEModel } from '@app/pages/ruce/refruce/Model/persona-ruce-model';
import { AutoridadOrganizacionRUCEModel } from '../../Models/autoridad-organizacionruce-model';
import { AutoridadOrganizacionRUCEService } from '../../Services/autoridad-organizacionruce.service';
import { RefcargoService } from '@app/pages/ruce/refruce/Services/refcargo-service';
import { PersonaruceService } from '@app/pages/ruce/refruce/Services/personaruce-service';
import { OrganizacionRUCEModel } from '@app/pages/ruce/organizacionruce/Models/organizacionruce-model';
import { OrganizacionRUCEService } from '@app/pages/ruce/organizacionruce/Services/organizacionruce-service.service';

@Component({
  selector: 'vex-autoridad-organizacionRUCE',
  templateUrl: './autoridad-list.component.html',
  styleUrls: ['./autoridad-list.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class AutoridadOrganizacionListComponent implements OnInit, OnDestroy {

  filtroBusqueda: FilterOptions = { PageSize: 10 };
  searchOptionsBusqueda!: SearchOptionsGeneric[];
  frmAutoridades!: FormGroup;

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<AutoridadOrganizacionRUCEModel>[];

  autoridadesOrganizacion: AutoridadOrganizacionRUCEModel[] = [];
  personaRUCE: PersonaRUCEModel[] = [];
  refCargo: RefCargoModel[] = [];


  @Input() idOrganizacion!: number;

  constructor(
    private fb: FormBuilder,
    public autoridadService: AutoridadOrganizacionRUCEService,
    public refCargoService: RefcargoService,
    public personaRUCEService: PersonaruceService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerBusqueda()
  }

  ngOnDestroy(): void {
  }

  obtenerBusqueda() {
    this.filtro = { estaActivo: true, PageSize: 10, fkOrganizacionRUCE:this.idOrganizacion};
    this.cargarList();
  }

  cargarList() {
    this.setColumns();
    //this.loadAutoridades();
    // this.loadNivelEduc();
    // this.loadEspecialidad();
    // this.loadEstado();
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
        name: '',
        label: '',
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
        value: "",
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

  loadAutoridades() {
    this.autoridadService.filter(this.filtro).subscribe((resp: DataPage<AutoridadOrganizacionRUCEModel>) => {
      this.autoridadesOrganizacion = Object.assign({},resp.entities,this.autoridadesOrganizacion) || [];
      this.setSearchOptions();
    });
  }

  // loadAutoridades() {
  //   this.autoridadService.filter(this.filtro).subscribe((resp: DataPage<AutoridadOrganizacionRUCEModel>) => {
  //     // console.log(resp)
  //     this.autoridadesOrganizacion = Object.assign(resp,this.autoridadesOrganizacion) || [];
  //     // console.log(this.autoridadesOrganizacion)
  //     // this.autoridadesOrganizacion.forEach((autoridad: AutoridadOrganizacionRUCEModel, index)=>{
  //     //   // console.log(Number(autoridad.fkRefCargo))
  //     //   this.refCargoService.findOne(Number(autoridad.fkRefCargo),this.filtro).subscribe((resp: any)=> {
  //     //     this.autoridadesOrganizacion[index].fkRefCargo = Object.assign(resp.entities[0],this.autoridadesOrganizacion[index].fkRefCargo) || this.autoridadesOrganizacion[index].fkRefCargo
  //     //   })
  //     //   this.personaRUCEService.findOne(Number(autoridad.fkPersonaRUCE),this.filtro).subscribe((resp: any)=> {
  //     //     this.autoridadesOrganizacion[index].fkPersonaRUCE = Object.assign(resp.entities[0],this.autoridadesOrganizacion[index].fkPersonaRUCE) || this.autoridadesOrganizacion[index].fkRefCargo
  //     //   })
  //     // })
  //     // console.log(this.autoridadesOrganizacion)
  //     this.setSearchOptions();
  //   });
  // }

  // loadPropForm() {
  //   const filtroPropForm: FilterOptions = { estaActivo: true }
  //   this.propFormService.filter(filtroPropForm).subscribe((resp: DataPage<PropuestaFormativaModel>) => {
  //     this.propFormModel = resp.entities || [];
  //     this.setSearchOptions();
  //   });
  // }

  // loadNivelEduc() {
  //   const filtroNivelEduc: FilterOptions = { estaActivo: true }
  //   this.refNivelEducService.filter(filtroNivelEduc).subscribe((resp: DataPage<RefniveleducativoModel>) => {
  //     this.refNivelEducList = resp.entities || [];
  //     this.setSearchOptions();
  //   });
  // }

  // loadEspecialidad() {
  //   const filtroEspec: FilterOptions = { estaActivo: true }
  //   this.refEspecialidadService.filter(filtroEspec).subscribe((resp: DataPage<RefEspecialidadModel>) => {
  //     this.refEspecialidad = resp.entities || [];
  //     this.setSearchOptions();
  //   });
  // }

  // loadEstado() {
  //   const filtroEstado: FilterOptions = { estaActivo: true }
  //   this.refPlanUnidadEstadoService.filter(filtroEstado).subscribe((resp: DataPage<RefestadoautoridadModeOrAutoridadOrganizacionRUCEService{
  //     this.refEstadoPlanUnidad = resp.entities || [];
  //     this.setSearchOptions();
  //   });
  // }

}
