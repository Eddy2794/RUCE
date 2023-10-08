import { Component, OnInit } from '@angular/core';
import { FilterOptions } from '@app/shared/utils/filter-options';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { InformeGral } from '../../Models/InformeGral';
import { InformeGralService } from '../../Services/reporte.service';

@Component({
  selector: 'vex-reportes-list',
  templateUrl: './reportes-list.component.html',
  styleUrls: ['./reportes-list.component.scss']
})
export class ReportesListComponent implements OnInit {

  searchOptions!: SearchOptionsGeneric[];
  // filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<InformeGral>[];

  constructor(protected reporteService: InformeGralService) { }

  ngOnInit(): void {
    this.setColumns();
    this.setSearchOptions();
  }

  private setColumns() {
    this.columnasVex = [
      // { label: "CÓDIGO", property: "id", type: "text", visible: true, },
      { label: "NOMBRE", property: "organizacionDesc", type: "text", visible: true, },
      { label: "CUE", property: "cue", type: "text", visible: true },
      { label: "ANEXO", property: "anexo", type: "text", visible: true },
      { label: "NIVEL", property: "nivel", type: "text", visible: true },
      { label: "REGION", property: "region", type: "text", visible: true },
      { label: "DEPARTAMENTO", property: "departamento",
        type: "text",
        visible: true,
      },
      {
        label: "LOCALIDAD",
        property: "localidad",
        type: "text",
        visible: true,
      },
      {
        label: "DOMICILIO",
        property: "domicilio",
        type: "text",
        visible: true,
      },
      { label: "EMAIL", property: "email", type: "text", visible: true },
      { label: "TELEFONO", property: "telefono", type: "text", visible: true },

    ];
  }

  private setSearchOptions() {
    this.searchOptions = [
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
    ];
  }

}
