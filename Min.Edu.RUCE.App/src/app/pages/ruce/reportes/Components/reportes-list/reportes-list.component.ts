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

@Component({
  selector: 'vex-reportes-list',
  templateUrl: './reportes-list.component.html',
  styleUrls: ['./reportes-list.component.scss']
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
  }

  private setColumns() {
    this.columnasVex = [
      //ORGANIZACION
      { label: "NOMBRE", property: "organizacion_r_u_c_e.organizacionDesc", type: "object", visible: true, },
      { label: "CUEANEXO", property: "organizacion_r_u_c_e.cueAnexo", type: "object", visible: true },
      { label: "NIVEL", property: "organizacion_r_u_c_e.nivel", type: "object", visible: true },
      { label: "REGION", property: "organizacion_r_u_c_e.region", type: "object", visible: true },
      { label: "DEPARTAMENTO", property: "organizacion_r_u_c_e.departamento", type: "object", visible: true, },
      { label: "LOCALIDAD", property: "organizacion_r_u_c_e.localidad",type: "object",visible: true, },
      { label: "CALLE",property: "organizacion_r_u_c_e.calle",type: "object",visible: true, },
      { label: "Nº",property: "organizacion_r_u_c_e.numero",type: "object",visible: true, },
      { label: "BARRIO",property: "organizacion_r_u_c_e.barrio",type: "object",visible: true, },
      { label: "EMAIL", property: "organizacion_r_u_c_e.email", type: "object", visible: true },
      { label: "TELEFONO", property: "organizacion_r_u_c_e.telefono", type: "object", visible: true },
      
      //COOPERADORA
      { label: "DENOMINACION", property: "denominacion", type: "text", visible: true, },
      { label: "ESTADO", property: "estado", type: "text", visible: true },
      { label: "LEGAJO", property: "legajo", type: "text", visible: true },
      { label: "MODALIDAD", property: "modalidad", type: "text", visible: true },
      { label: "CONVENIO CS ECONOMICAS", property: "convenioCsEconomicas", type: "boolean", visible: true },
      { label: "INSCRIPCION AFIP", property: "estadoAfip", type: "boolean", visible: true },
      { label: "INSCRIPCION RENTAS", property: "estadoRentas", type: "boolean", visible: true },
      { label: "INSCRIPCION RENACOPES", property: "inscripcionRenacopes", type: "boolean", visible: true },
      
      //COMISION
      { label: "NRO SOCIOS", property: "comision.0.nroSocios", type: "object", visible: true },
      { label: "PERIODO INICIO", property: "comision.0.periodoInicio", type: "object", visible: true },
      { label: "PERIODO FIN", property: "comision.0.periodoFin", type: "object", visible: true },
      { label: "ESTADO RESOLUCION", property: "comision.0.estadoResolucion", type: "object", visible: true },
      
      //AUTORIDADES
      { label: "AUTORIDADES", property: "comision.autoridad_comision", type: "array", visible: true },

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
        key: tipo.id,
        value: tipo.tipoAsociacionDesc
      }));
      this.tipos["comisiones"] = resultados[1].entities.map((tipo: any) => ({
        key: tipo.id,
        value: tipo.tipoComisionDesc
      }));
      this.tipos["fondos"] = resultados[2].entities.map((tipo: any) => ({
        key: tipo.id,
        value: tipo.tipoFondoDesc
      }));
  
      this.setSearchOptions();
    }, (error) => {
      console.error('Error al obtener datos:', error);
    });
  }

  private setSearchOptions() {
    console.log(this.tipos)
    this.searchOptions = [
      // OrganizacionRUCE
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: "region",
        label: "REGION",
        readonly: false,
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: "nivel",
        label: "NIVEL",
        readonly: false,
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: "matricula",
        label: "MATRICULA",
        readonly: false,
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.SELECT,
        typeData: TypeData.OBJECT,
        name: "tipoAsociacion",
        label: "TIPO ASOCIACION",
        options: this.tipos["asociaciones"],
        // value: this.tipos["asociaciones"],
        readonly: false,
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.SELECT,
        typeData: TypeData.OBJECT,
        name: "tipoComision",
        label: "TIPO COMISION",
        // options: this.tipos["comisiones"],
        value: this.tipos["comisiones"],
        readonly: false,
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.SELECT,
        typeData: TypeData.OBJECT,
        name: "tipoFondo",
        label: "TIPO FONDO",
        // options: this.tipos["fondos"],
        value: this.tipos["fondos"],
        readonly: false,
      }),
    ];
  }

}
