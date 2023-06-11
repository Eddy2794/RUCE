import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CargoSalarialModel } from '@app/pages/cargosalarial/model/cargosalarial.model';
import { CargosalarialService } from '@app/pages/cargosalarial/services/cargosalarial.service';
import { RefAdicionalModel } from '@app/pages/referenciales/refadicional/model/refadicional.model';
import { RefAdicionalService } from '@app/pages/referenciales/refadicional/services/refadicional.service';
import { RefEjercicioModel } from '@app/pages/referenciales/refejercicio/model/refejercicio.model';
import { RefEjercicioService } from '@app/pages/referenciales/refejercicio/services/refejercicio.service';
import { RefEscalafonModel } from '@app/pages/referenciales/refescalafon/model/refescalafon.model';
import { RefEscalafonService } from '@app/pages/referenciales/refescalafon/services/refescalafon.service';
import { RefFinalidadxejerModel } from '@app/pages/referenciales/reffinalidadxejer/model/reffinalidadxejer.model';
import { RefFinalidadxejerService } from '@app/pages/referenciales/reffinalidadxejer/services/reffinalidadxejer.service';
import { RefFuncionxejerModel } from '@app/pages/referenciales/reffuncionxejer/model/reffuncionxejer.model';
import { RefFuncionxejerService } from '@app/pages/referenciales/reffuncionxejer/services/reffuncionxejer.service';
import { RefUdeOxEjerModel } from '@app/pages/referenciales/refudeoxejer/model/refudeoxejer.model';
import { RefUdeOxEjerService } from '@app/pages/referenciales/refudeoxejer/services/refudeoxejer.service';
import { SearchService } from '@app/shared/services/search.service';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';
import { isThisSecond } from 'date-fns';
import { Subscription } from 'rxjs';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { PresupuestoModel } from '../../model/presupuesto.model';
import { ObserverPresupuestoService } from '../../services/observer-presupuesto.service';
import { PresupuestoService } from '../../services/presupuesto.service';

@Component({
  selector: 'vex-presupuesto-list',
  templateUrl: './presupuesto-list.component.html',
  styleUrls: ['./presupuesto-list.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ],

})
export class PresupuestoListComponent implements OnInit, OnDestroy {
  idRefEjercicio!: number;
  searchOptions!: SearchOptionsGeneric[];

  filtro: FilterOptions = { estaActivo: true };
  columnasVex: TableColumn<PresupuestoModel>[];
  frmPresupuestoList: FormGroup;
  refEjercicioList: RefEjercicioModel[];
  refEscalafonList: RefEscalafonModel[];
  refAdicionalList: RefAdicionalModel[];
  refCargoSalarialList: CargoSalarialModel[];
  refFuncionxEjerList: any = [];
  refUdeOxEjercicioList: any = [];
  refFinalidadxEjerList: any = [];
  suscriptionIdEjercicio: Subscription;
  constructor(
    private fb: FormBuilder,
    public searchService: SearchService,
    public refEjercicioService: RefEjercicioService,
    public refUdeOxEjercicio: RefUdeOxEjerService,
    public refFinalidadxEjerService: RefFinalidadxejerService,
    public refFuncionxEjerService: RefFuncionxejerService,
    public refEscalafonService: RefEscalafonService,
    public refAdicionalService: RefAdicionalService,
    public presupuestoService: PresupuestoService,
    public osberverEjercicioService: ObserverPresupuestoService) {
    this.createForm();
  }
  ngOnDestroy(): void {
    this.suscriptionIdEjercicio.unsubscribe();
  }

  ngOnInit(): void {
    
    this.loadEjercicio();
    this.loadIdEjercicio();
    this.loadAdicional();
    this.loadEscalafon();
    

  }

  private setColumns() {
    this.columnasVex = [
      { label: 'CÓDIGO', property: 'id', type: 'text', visible: true },
      { label: 'CÓDIGO UdeO', property: 'refUdeOxEjer.codUdeO', type: 'object', visible: true },
      { label: 'EJERCICIO', property: 'refUdeOxEjer.refEjercicio.ejercicioDesc', type: 'object', visible: true },
      { label: 'UNIDAD DE ORGANIZACIÓN', property: 'refUdeOxEjer.refUdeO.udeoDesc', type: 'object', visible: true },
      { label: 'FINALIDAD', property: 'refFinalidadxEjer.refFinalidad.finalidadDesc', type: 'object', visible: true },
      { label: 'FUNCIÓN', property: 'refFuncionxEjer.refFuncion.funcionDesc', type: 'object', visible: true },
      { label: 'ESCALAFÓN', property: 'refEscalafon.escalafonDesc', type: 'object', visible: true },
      { label: 'CARGO SALARIAL', property: 'cargoSalarial.cargoSalarialDesc', type: 'object', visible: true },
      { label: 'CANTIDAD PRESUPUESTADA', property: 'cantPresupuestada', type: 'text', visible: true },
      { label: 'CANTIDAD DISPONIBLE', property: 'cantDisponible', type: 'text', visible: true },
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true }
    ]
  }

  loadEjercicio() {
    const filtroEjercicio: FilterOptions = { estaActivo: true, SortProperties: 'ejercicioDesc desc', PageSize: 100 }
    this.refEjercicioService.filter(filtroEjercicio).subscribe((resp: any) => {
      if (resp) {
        this.refEjercicioList = resp.entities || [];
        // this.setColumns();
      }
    });
  }
  loadIdEjercicio() {
    this.suscriptionIdEjercicio = this.osberverEjercicioService.castIdIdEjercicio.subscribe((value) => {
      if (value !== this.idRefEjercicio) {
        this.idRefEjercicio = value;
        this.filtro['idRefEjercicio'] = value;
        this.searchService.setSearch = this.filtro;
        this.osberverEjercicioService.enviarIdEjercicio(this.idRefEjercicio);
        this.frmPresupuestoList.controls.idRefEjercicio.setValue(value);
        this.loadReferencialesByEjercicio(value);
        this.setColumns();
      
      }
    });
  }
  createForm() {
    this.frmPresupuestoList = this.fb.group({
      id: null,
      idRefEjercicio: [null],

    });
  }
  changeEjercicio(event) {
    if (event.value != 0) {
      this.idRefEjercicio = event.value;
      this.filtro['idRefEjercicio'] = event.value;
      this.searchService.setSearch = this.filtro;
      this.osberverEjercicioService.enviarIdEjercicio(this.idRefEjercicio);
      this.loadReferencialesByEjercicio(this.idRefEjercicio);
      //this.cdr.detectChanges();
    }
  }
  loadReferencialesByEjercicio(id: number) {
    this.loadUdeO(id);
    this.loadFinalidad(id);
    this.loadFuncion(id);

  }
  private setSearchOptions() {
    this.searchOptions = [
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.NUMBER,
        name: 'id',
        label: 'Código',
        readonly: false
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.SELECT,
        typeData: TypeData.TEXT,
        name: 'idRefUdeOxEjer',
        label: 'UdeO',
        readonly: false,
        value: this.refUdeOxEjercicioList,
        property: 'UdeODesc'
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.SELECT,
        typeData: TypeData.TEXT,
        name: 'idRefFinalidadxEjer',
        label: 'Finalidad',
        readonly: false,
        value: this.refFinalidadxEjerList,
        property: 'finalidadDesc'
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.SELECT,
        typeData: TypeData.TEXT,
        name: 'idRefFuncionxEjer',
        label: 'Función',
        readonly: false,
        value: this.refFuncionxEjerList,
        property: 'funcionDesc'
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.SELECT,
        typeData: TypeData.TEXT,
        name: 'idRefAdicional',
        label: 'Adicional',
        readonly: false,
        value: this.refAdicionalList,
        property: 'adicionalDesc'
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.SELECT,
        typeData: TypeData.TEXT,
        name: 'idRefEscalafon',
        label: 'Escalafón',
        readonly: false,
        value: this.refEscalafonList,
        property: 'escalafonDesc'
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: 'CargoSalarialDescContains',
        label: 'Cargo Salarial',
        readonly: false
      }),

    ]
  }
  loadUdeO(idEjercicioSelect: number) {
    const filtroUdeO: FilterOptions = { estaActivo: true, idRefEjercicio: idEjercicioSelect };
    this.refUdeOxEjercicio.filter(filtroUdeO).subscribe((resp: any) => {
      this.refUdeOxEjercicioList = resp.entities;
      this.refUdeOxEjercicioList = resp.entities.map(item => ({ id: item.id, UdeODesc: item.refUdeO.udeoDesc }));
      this.setSearchOptions();
    });
  }
  loadFinalidad(idEjercicioSelect: number) {
    const filtroFinalidad: FilterOptions = { estaActivo: true, idRefEjercicio: idEjercicioSelect };
    this.refFinalidadxEjerService.filter(filtroFinalidad).subscribe((resp: any) => {
      this.refFinalidadxEjerList = resp.entities.map(item => ({ id: item.id, finalidadDesc: item.refFinalidad.finalidadDesc }));
      this.setSearchOptions();
    });

  }
  loadFuncion(idEjercicioSelect: number) {
    const filtroFuncion: FilterOptions = { estaActivo: true, idRefEjercicio: idEjercicioSelect };
    this.refFuncionxEjerService.filter(filtroFuncion).subscribe((resp: any) => {
      this.refFuncionxEjerList = resp.entities.map(item => ({ id: item.id, funcionDesc: item.refFuncion.funcionDesc }));
      this.setSearchOptions();
    });
  }
  loadEscalafon() {
    const filtroEscalafon: FilterOptions = { estaActivo: true, PageSize: 20 };
    this.refEscalafonService.filter(filtroEscalafon).subscribe((resp: any) => {
      this.refEscalafonList = resp.entities || [];
    });
  }
  loadAdicional() {
    const filtroAdicional: FilterOptions = { estaActivo: true, PageSize: 20 };
    this.refAdicionalService.filter(filtroAdicional).subscribe((resp: any) => {
      this.refAdicionalList = resp.entities || [];
    });
  }

}
