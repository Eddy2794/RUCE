import { ReftipocomisionModel } from '@app/pages/ruce/refruce/Model/reftipocomision-model';
import { Component, OnInit } from '@angular/core';
import { FilterOptions } from '@app/shared/utils/filter-options';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { InformeGral } from '../../Models/InformeGral';
import { InformeGralService } from '../../Services/reporte.service';
import { RefTipoAsociacionService } from '@app/pages/ruce/refruce/Services/reftipoasociacion.service';
import { ReftipocomisionService } from '@app/pages/ruce/refruce/Services/reftipocomision.service';
import { RefinstanciaInstrumentoService } from '@app/pages/ruce/refruce/Services/refinstanciainstrumento.service';
import { RefTipoFondoService } from '@app/pages/ruce/refruce/Services/reftipofondo.service';
import { RefTipoAsociacionModel } from '@app/pages/ruce/refruce/Model/reftipoasociacion-model';
import { DataPage } from '@app/shared/utils/data-page';
import { RefTipoFondoModel } from '@app/pages/ruce/refruce/Model/reftipofondo-model';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';

@Component({
  selector: 'vex-reportes-list',
  templateUrl: './reportes-list.component.html',
  styleUrls: ['./reportes-list.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class ReportesListComponent implements OnInit {

  searchOptions!: SearchOptionsGeneric[];
  // filtros!: {};
  filtro: FilterOptions = { estaActivo: true};
  columnasVex: TableColumn<InformeGral>[];
  tipos = {
    "asociaciones": [],
    "comisiones": [],
    "fondos": [],
    "regiones": [
      {id:"I", region:"I"},
      {id:"II", region:"II"},
      {id:"III", region:"III"},
      {id:"IV", region:"IV"},
      {id:"V", region:"V"},
      {id:"VI", region:"VI"},
      {id:"VIi", region:"VIi"},
    ],
    "niveles": [
      {id: "INICIAL", nivel:"INICIAL"}, 
      {id: "PRIMARIO", nivel:"PRIMARIO"}, 
      {id: "SECUNDARIO", nivel:"SECUNDARIO"},
      {id: "SUPEROPR", nivel:"SUPEROPR"},
      {id: "EDUCACION ESPECIAL", nivel:"EDUCACION ESPECIAL"}, 
      {id: "TECNICO PROFESIONAL", nivel:"TECNICO PROFESIONAL"}
    ],
    "modalidades": [
      {id: "COMUN", modalidad:"COMUN"}, 
      {id: "RURAL", modalidad:"RURAL"}, 
      {id: "CONTEXTO DE ENCIERRO", modalidad:"CONTEXTO DE ENCIERRO"},
      {id: "NOCTURNA", modalidad:"NOCTURNA"},
    ],
  }

  constructor(
    protected reporteService: InformeGralService,
    protected tipoAsociacionService: RefTipoAsociacionService,
    protected tipoComisionService: ReftipocomisionService,
    protected instanciaInstrumentoService: RefinstanciaInstrumentoService,
    protected tipoFondoService: RefTipoFondoService,
    ) {}

  ngOnInit(): void {
    this.setColumns();
    this.setSearchData();
    // this.setSearchOptions();
  }

  private setColumns() {
    this.columnasVex = [
      //ORGANIZACION
      { label: "INSTITUCIÓN", property: "organizacionDesc", type: "object", visible: true, },
      { label: "CUEANEXO", property: "cueAnexo", type: "object", visible: true },
      { label: "NIVEL", property: "nivel", type: "object", visible: true },
      { label: "REGION", property: "region", type: "object", visible: true },
      { label: "DEPARTAMENTO", property: "departamento", type: "object", visible: true, },
      { label: "LOCALIDAD", property: "localidad",type: "object",visible: true, },
      { label: "CALLE",property: "calle",type: "object",visible: true, },
      { label: "Nº",property: "numero",type: "object",visible: true, },
      { label: "BARRIO",property: "barrio",type: "object",visible: true, },
      { label: "EMAIL", property: "email", type: "object", visible: true },
      { label: "TELEFONO", property: "telefono", type: "object", visible: true },
      { label: "AUTORIDADES INSTITUCION", property: "autoridades", type: "array", visible: true },

      //MATRICULA
      { label: 'MATRICULA', property: 'matricula.0.matricula', type: 'object', visible: true },
      
      //COOPERADORA
      { label: "DENOMINACION", property: "cooperadora.denominacion", type: "object", visible: true, },
      { label: "ESTADO", property: "cooperadora.estado", type: "object", visible: true },
      { label: "LEGAJO", property: "cooperadora.legajo", type: "object", visible: true },
      { label: "MODALIDAD", property: "cooperadora.modalidad", type: "object", visible: true },
      { label: "CONVENIO CS ECONOMICAS", property: "cooperadora.convenioCsEconomicas", type: "boolean", visible: true },
      { label: "INSCRIPCION AFIP", property: "cooperadora.estadoAfip", type: "boolean", visible: true },
      { label: "INSCRIPCION RENTAS", property: "cooperadora.estadoRentas", type: "boolean", visible: true },
      { label: "INSCRIPCION RENACOPES", property: "cooperadora.inscripcionRenacopes", type: "boolean", visible: true },
      
      //COMISION
      { label: "NRO SOCIOS", property: "cooperadora.comision.0.nroSocios", type: "object", visible: true },
      { label: "PERIODO INICIO", property: "cooperadora.comision.0.periodoInicio", type: "object", visible: true },
      { label: "PERIODO FIN", property: "cooperadora.comision.0.periodoFin", type: "object", visible: true },
      { label: "ESTADO RESOLUCION", property: "cooperadora.comision.0.estadoResolucion", type: "object", visible: true },
      
      //AUTORIDADES
      { label: "AUTORIDADES COMISION", property: "cooperadora.comision.autoridad_comision", type: "array", visible: true },

      //EXPEDIENTE
      { label: "NRO EXPEDIENTE", property: "cooperadora.expediente.nroExpediente", type: "object", visible: true },

      //PERSONERIA
      { label: "NRO RESOLUCION", property: "cooperadora.personeria.nroResolucion", type: "object", visible: true },
      { label: "DECRETO", property: "cooperadora.personeria.decreto", type: "object", visible: true },

      //BALANCE

      //FONDO
      
      //KIOSCO

      //ATENCION SEGUIMIENTO
      
    ];
  }

  private setSearchOptions() {
      console.log(this.tipos)
    this.searchOptions = [
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: "matricula",
        label: "MATRICULA",
        readonly: false,
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: "departamento",
        label: "DEPARTAMENTO",
        readonly: false,
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: "localidad",
        label: "LOCALIDAD",
        readonly: false,
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.SELECT,
        typeData: TypeData.OBJECT,
        name: "region",
        label: "REGION",
        property: "region",
        value: this.tipos["regiones"],
        readonly: true,
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.SELECT,
        typeData: TypeData.OBJECT,
        name: "nivel",
        label: "NIVEL",
        property: "nivel",
        value: this.tipos["niveles"],
        readonly: false,
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.SELECT,
        typeData: TypeData.OBJECT,
        name: "modalidad",
        label: "MODALIDAD",
        property: "modalidad",
        value: this.tipos["modalidades"],
        readonly: false,
      }),
    ];
  }

  private async setSearchData(){
    const observables = [
      this.tipoAsociacionService.filter(this.filtro),
      this.tipoComisionService.filter(this.filtro),
      this.tipoFondoService.filter(this.filtro)
    ];
  
    forkJoin(observables).subscribe((resultados: any[]) => {
      this.tipos["asociaciones"] = resultados[0].entities.map((tipo: any) => ({
        id: tipo.id,
        tipoAsociacionDesc: tipo.tipoAsociacionDesc
      }));
      this.tipos["comisiones"] = resultados[1].entities.map((tipo: any) => ({
        id: tipo.id,
        tipoComisionDesc: tipo.tipoComisionDesc
      }));
      this.tipos["fondos"] = resultados[2].entities.map((tipo: any) => ({
        id: tipo.id,
        tipoFondoDesc: tipo.tipoFondoDesc
      }));
  
      this.setSearchOptions();
    }, (error) => {
      console.error('Error al obtener datos:', error);
    });
  }

  // private setSearchOptions() {
  //   console.log(this.tipos)
  //   this.searchOptions = [
  //     // OrganizacionRUCE
  //     new SearchOptionsGeneric({
  //       typeControl: TypeControl.INPUT,
  //       typeData: TypeData.TEXT,
  //       name: "region",
  //       label: "REGION",
  //       readonly: false,
  //     }),
  //     new SearchOptionsGeneric({
  //       typeControl: TypeControl.INPUT,
  //       typeData: TypeData.TEXT,
  //       name: "nivel",
  //       label: "NIVEL",
  //       readonly: false,
  //     }),
  //     new SearchOptionsGeneric({
  //       typeControl: TypeControl.INPUT,
  //       typeData: TypeData.TEXT,
  //       name: "matricula",
  //       label: "MATRICULA",
  //       readonly: false,
  //     }),
  //     new SearchOptionsGeneric({
  //       typeControl: TypeControl.SELECT,
  //       typeData: TypeData.OBJECT,
  //       name: "tipoAsociacion",
  //       label: "TIPO ASOCIACION",
  //       options: this.tipos["asociaciones"],
  //       // value: this.tipos["asociaciones"],
  //       readonly: false,
  //     }),
  //     new SearchOptionsGeneric({
  //       typeControl: TypeControl.SELECT,
  //       typeData: TypeData.OBJECT,
  //       name: "tipoComision",
  //       label: "TIPO COMISION",
  //       // options: this.tipos["comisiones"],
  //       value: this.tipos["comisiones"],
  //       readonly: false,
  //     }),
  //     new SearchOptionsGeneric({
  //       typeControl: TypeControl.SELECT,
  //       typeData: TypeData.OBJECT,
  //       name: "tipoFondo",
  //       label: "TIPO FONDO",
  //       // options: this.tipos["fondos"],
  //       value: this.tipos["fondos"],
  //       readonly: false,
  //     }),
  //   ];
  // }

}
