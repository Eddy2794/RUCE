import { AutoridadOrganizacionRUCEService } from './../../../Services/AutoridadOrganizacionRUCE/autoridad-organizacionruce.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AutoridadOrganizacionRUCEModel } from '@app/pages/ruce/reforganizacionruce/autoridades/Models/AutoridadOrganizacionRUCE/autoridad-organizacionruce-model';
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
import { OrganizacionRUCEService } from '@app/pages/ruce/reforganizacionruce/organizacion/Services/OrganizacionRUCE/organizacionruce-service.service';
import { OrganizacionRUCEModel } from '@app/pages/ruce/reforganizacionruce/organizacion/Models/OrganizacionRUCE/organizacionruce-model';
import { ObserverValueService } from '@app/pages/plaza/services/observervalue.service';

@Component({
  selector: 'vex-autoridad-organizacionRUCE',
  templateUrl: './autoridad-list.component.html',
  styleUrls: ['./autoridad-list.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class AutoridadListComponent implements OnInit, OnDestroy {

  columnasBusqueda!: TableColumn<OrganizacionRUCEModel>[];
  filtroBusqueda: FilterOptions = { PageSize: 10 };
  searchOptionsBusqueda!: SearchOptionsGeneric[];
  frmAutoridades!: FormGroup;

  searchOptions!: SearchOptionsGeneric[];
  filtro: FilterOptions = { estaActivo: true };
  columnasVex: TableColumn<AutoridadOrganizacionRUCEModel>[];

  autoridadesOrganiazcion: AutoridadOrganizacionRUCEModel[] = [];
  refNivelEducList: RefniveleducativoModel[] = [];
  refJornadaModel: RefJornadaModel[] = [];
  refEspecialidad: RefEspecialidadModel[] = [];

  verListado: boolean = false;

  subsOrganizacion: Subscription;
  obsOrganizacion!: OrganizacionRUCEModel;

  constructor(
    private fb: FormBuilder,
    public organizacionRUCEService: OrganizacionRUCEService,
    public autoridadService: AutoridadOrganizacionRUCEService,
    private observerValueService: ObserverValueService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.createForm();
    this.setBusqueda();
    // this.loadJornada();
    // this.loadCategoria();
  }

  ngOnDestroy(): void {
    this.subsOrganizacion.unsubscribe();
  }

  createForm() {
    this.frmAutoridades = this.fb.group({
      idOrganizacion: [null, { validators: [Validators.required] }],
      organizacionDesc: null,
      idRefEspecialidad: null,
      cue: null,
      anexo: null,
      jornadaDesc: null,
      categoriaOrganizacionDesc: null,
    });
  }

  private setBusqueda() {
    this.columnasBusqueda = [
      { label: 'CÓDIGO', property: 'id', type: 'text', visible: true },
      { label: 'ORGANIZACION', property: 'organizacionDesc', type: 'text', visible: true },
      { label: 'CUE', property: 'cue', type: 'text', visible: true },
      { label: 'ANEXO', property: 'anexo', type: 'text', visible: true },
      { label: 'JORNADA', property: 'refJornada.jornadaDesc', type: 'object', visible: true },
      { label: 'CATEGORIA', property: 'refCategoriaOrganizacion.categoriaOrganizacionDesc', type: 'object', visible: true },
      { label: '', property: 'selection', type: 'button', visible: true }
    ];
  }
  private setSearchOptions2() {
    this.searchOptionsBusqueda = [
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.NUMBER,
        name: 'id',
        label: 'Código',
        readonly: false
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: 'organizacionDescContains',
        label: 'Organizacion',
        readonly: false
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: 'cue',
        label: 'CUE',
        readonly: false
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: 'anexo',
        label: 'Anexo',
        readonly: false
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.SELECT,
        typeData: TypeData.TEXT,
        name: 'idRefJornada',
        label: 'Jornada',
        readonly: false,
        value: this.refJornadaModel,
        property: 'jornadaDesc'
      }),
      // new SearchOptionsGeneric({
      //   typeControl: TypeControl.SELECT,
      //   typeData: TypeData.TEXT,
      //   name: 'idRefCategoriaOrganizacion',
      //   label: 'Categoria',
      //   readonly: false,
      //   value: this.refCatModel,
      //   property: 'categoriaOrganizacionDesc'
      // }),
    ];
  }
  // loadJornada() {
  //   const filtroJornada: FilterOptions = { estaActivo: true, SortProperties: 'jornadaDesc asc', PageSize: 1000 }
  //   this.refJornadaService.filter(filtroJornada).subscribe((resp: DataPage<RefJornadaModel>) => {
  //     this.refJornadaModel = resp.entities || [];
  //     this.setSearchOptions2();
  //   });
  // }
  // loadCategoria() {
  //   const filtroCat: FilterOptions = { estaActivo: true }
  //   this.refCatService.filter(filtroCat).subscribe((resp: DataPage<RefCategoriaOrganizacionRUCEModel>) => {
  //     this.refCatModel = resp.entities || [];
  //     this.setSearchOptions2();
  //   });
  // }

  obtenerBusqueda(resp) {
    if (resp) {
      this.frmAutoridades.patchValue(resp);
      this.frmAutoridades.controls.jornadaDesc.setValue(resp.refJornada ? resp.refJornada.jornadaDesc : 'SIN DATOS');
      this.frmAutoridades.controls.categoriaOrganizacionDesc.setValue(resp.refCategoriaOrganizacion ? resp.refCategoriaOrganizacion.categoriaOrganizacionDesc : 'SIN DATOS');
      this.frmAutoridades.controls.idOrganizacion.setValue(resp.id);
      this.observerValueService.sendIdOrgValue(resp.id);
      this.observerValueService.sendDescOrgValue(resp.organizacionDesc);
      // this.observerValueService.sendOrganizacionValue(resp);
      this.filtro = { estaActivo: true, PageSize: 10, idOrganizacion: resp.id };
      this.cargarList();
    }
    else {
      this.frmAutoridades.reset();
      this.verListado = false;
    }

  }

  cargarList() {
    this.setColumns();
    this.loadAutoridades();
    // this.loadNivelEduc();
    // this.loadEspecialidad();
    // this.loadEstado();
    this.verListado = true;
  }

  private setColumns() {
    this.columnasVex = [
      { label: 'CÓDIGO', property: 'id', type: 'text', visible: true },
      { label: 'CARGO', property: 'fkRefCargo', type: 'text', visible: true },
      { label: 'PERSONA', property: 'fkPersonaRUCE', type: 'text', visible: true },
      { label: 'ORGANIZACION', property: 'fkOrganizacionRUCE', type: 'text', visible: true },
      { label: 'INICIO DE CARGO', property: 'inicioCargo', type: 'text', visible: true },
      { label: 'FIN DE CARGO', property: 'finCargo', type: 'text', visible: true },
      
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
        value: this.refNivelEducList,
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
    this.autoridadService.filter(this.filtro).subscribe((resp: DataPage<any>) => {
      this.autoridadesOrganiazcion = Object.assign({},resp.entities,this.autoridadesOrganiazcion) || [];
      this.setSearchOptions();
    });
  }

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
