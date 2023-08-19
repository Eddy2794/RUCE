import { Component, OnInit } from '@angular/core';
import { SearchOptionsGeneric, TypeControl, TypeData } from '../../../../../shared/utils/search-options-generic';
import { FilterOptions } from '../../../../../shared/utils/filter-options';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizacionModel } from '@app/pages/referenciales/organizacion/model/organizacion.model';
import { OrganizacionService } from '@app/pages/referenciales/organizacion/services/organismos.service';
import { PlazaService } from '../../../services/plaza.service';
import { ObserverValueService } from '@app/pages/plaza/services/observervalue.service';
import { PlazaModel } from '@app/pages/plaza/model/plaza.model';
import { RefJornadaModel } from '@app/pages/referenciales/refjornada/model/refjornada.model';
import { RefCategoriaOrganizacionModel } from '@app/pages/referenciales/refcategoriaorganizacion/model/refcategoriaorganizacion.model';
import { RefjornadaService } from '../../../../referenciales/refjornada/services/refjornada.service';
import { RefcategoriaorganizacionService } from '../../../../referenciales/refcategoriaorganizacion/services/refcategoriaorganizacion.service';
import { DataPage } from '@app/shared/utils';
import { CargosalarialService } from '@app/pages/cargosalarial/services/cargosalarial.service';
import { CargoSalarialModel } from '@app/pages/cargosalarial/model/cargosalarial.model';
// import { CargoSalarialModel } from '../../../../cargosalarial/model/cargosalarial.model';
// import { CargosalarialService } from '../../../../cargosalarial/services/cargosalarial.service';


@Component({
  selector: 'vex-plaza-list',
  templateUrl: './plaza-list.component.html',
  styleUrls: ['./plaza-list.component.scss']
})
export class PlazaListComponent implements OnInit {
  columnasBusqueda!: TableColumn<OrganizacionModel>[];
  filtroBusqueda: FilterOptions = { PageSize: 5, esEducativa: true };
  searchOptionsBusqueda!: SearchOptionsGeneric[];
  frmPlaza!: FormGroup;

  searchOptions!: SearchOptionsGeneric[];
  filtro: FilterOptions = {estaActivo:true};
  columnasVex: TableColumn<PlazaModel>[];


  refJornadaModel: RefJornadaModel[] = [];
  refCatModel: RefCategoriaOrganizacionModel[] = [];
  cargoSalarialModel: CargoSalarialModel[]=[];

  verListado: boolean = false;


  constructor(private fb: FormBuilder,
    public organizacionService: OrganizacionService,
    public plazaService: PlazaService,
    public refJornadaService: RefjornadaService,
    public refCatService: RefcategoriaorganizacionService,
    public cargosalarialService: CargosalarialService,
    private observerValueService: ObserverValueService,
    ) { }

  ngOnInit(): void {
    this.createForm();
    this.setBusqueda();
    this.loadJornada();
    this.loadCategoria();
  }
  createForm() {
    this.frmPlaza = this.fb.group({
      idOrganizacion: [null, { validators: [Validators.required] }],
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
      new SearchOptionsGeneric({
        typeControl: TypeControl.SELECT,
        typeData: TypeData.TEXT,
        name: 'idRefCategoriaOrganizacion',
        label: 'Categoria',
        readonly: false,
        value: this.refCatModel,
        property: 'categoriaOrganizacionDesc'
      }),
    ];
  }
  loadJornada() {
    const filtroJornada: FilterOptions = {estaActivo: true, SortProperties: 'jornadaDesc asc', PageSize: 1000 }
    this.refJornadaService.filter(filtroJornada).subscribe((resp: DataPage<RefJornadaModel>) => {
      this.refJornadaModel = resp.entities || [];
      this.setSearchOptions2();
    });
  }
  loadCategoria() {
    const filtroCat: FilterOptions = { estaActivo: true }
    this.refCatService.filter(filtroCat).subscribe((resp: DataPage<RefCategoriaOrganizacionModel>) => {
      this.refCatModel = resp.entities || [];
      this.setSearchOptions2();
    });
  }

  obtenerBusqueda(resp) {
    if (resp) {
      this.frmPlaza.patchValue(resp);
      this.frmPlaza.controls.jornadaDesc.setValue(resp.refJornada? resp.refJornada.jornadaDesc : 'SIN DATOS');
      this.frmPlaza.controls.categoriaOrganizacionDesc.setValue(resp.refCategoriaOrganizacion? resp.refCategoriaOrganizacion.categoriaOrganizacionDesc : 'SIN DATOS');
      this.observerValueService.sendIdOrgValue(resp.id);
      this.observerValueService.sendDescOrgValue(resp.organizacionDesc);
      // this.filtro = { estaActivo: true, idOrganizacion: resp.id };
      this.cargarList();
    }
    else {
      this.frmPlaza.reset();
      this.verListado = false;
    }

  }
  cargarList(){
    this.setColumns();
    this.loadCargoSalarial();
    this.verListado = true;
  }
  private setColumns() {
    this.columnasVex = [
      { label: 'CUPOF', property: 'id', type: 'text', visible: true },
      { label: 'MOTIVO DE CREACIÓN', property: 'organizacionDesc', type: 'text', visible: true },
      { label: 'CARGO SALARIAL', property: 'cue', type: 'text', visible: true },
      { label: 'FECHA DESDE', property: 'anexo', type: 'text', visible: true },
      { label: 'FECHA HASTA', property: 'refTipoOrganizacion.tipoOrganizacionDesc', type: 'object', visible: true },
      { label: 'ESTADO', property: 'codigoLiquidacion', type: 'text', visible: true },
      { label: 'SITUACIÓN', property: 'actions', type: 'button', visible: true }
    ]
  }

  loadCargoSalarial() {
    const filtroCargoSalarial: FilterOptions = { estaActivo: true }
    this.refCatService.filter(filtroCargoSalarial).subscribe((resp: DataPage<CargoSalarialModel>) => {
      this.cargoSalarialModel = resp.entities || [];
      this.setSearchOptions();
    });
  }

  private setSearchOptions() {
    this.searchOptions = [
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.NUMBER,
        name: 'id',
        label: 'CUPOF',
        readonly: false,
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: 'planEstudioDesc',
        label: 'Motivo de creación',
        readonly: false,
      }),
        new SearchOptionsGeneric({
          typeControl: TypeControl.SELECT,
          typeData: TypeData.TEXT,
          name: 'idPropuestaFormativa',
          label: 'Cargo Salarial',
        readonly: false,
        value: this.cargoSalarialModel,
        property: 'propuestaFormativaDesc'
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.DATEPICKER,
        typeData: TypeData.TEXT,
        name: 'idRefNivelEducativo',
        label: 'Fecha desde',
        readonly: false
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.DATEPICKER,
        typeData: TypeData.TEXT,
        name: 'idRefEspecialidad',
        label: 'Fecha Hasta',
        readonly: false
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: 'estadoPlanUnidadDesc',
        label: 'Estado',
        readonly: false
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: 'estadoPlanUnidadDesc',
        label: 'Situación',
        readonly: false
      }),
    ]
  }


}
