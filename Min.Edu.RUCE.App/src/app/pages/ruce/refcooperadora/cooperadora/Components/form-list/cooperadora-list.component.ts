import { CooperadoraService } from "../../Services/Cooperadora/cooperadora.service";
import { CooperadoraModel } from "../../Models/Cooperadora/cooperadora-model";
import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";

import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {
  SearchOptionsGeneric,
  TypeControl,
  TypeData,
} from "@app/shared/utils/search-options-generic";
import { ColumnOptions, FilterOptions } from "@app/shared/utils";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";

@Component({
  selector: "cooperadora-list",
  templateUrl: "./cooperadora-list.component.html",
  styleUrls: ["./cooperadora-list.component.scss"],
})
export class CooperadoraListComponent implements OnInit {
  searchOptions!: SearchOptionsGeneric[];
  filtro: FilterOptions = { estaActivo: true };
  refCooperadora: CooperadoraModel[] = [];
  columnasVex: TableColumn<CooperadoraModel>[];

  constructor(
    protected cooperadoraService: CooperadoraService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setColumns();
    this.setSearchOptions();
  }

  private setColumns() {
    this.columnasVex = [
      { label: "ACCIONES", property: "actions", type: "button", visible: true },
      { label: "CÓDIGO", property: "id", type: "text", visible: false },
      { label: "CUE INSTITUCIÓN", property: "fkOrganizaciónRUCE", type: "text", visible: true, },
      { label: "DENOMINACION", property: "denominacion", type: "text", visible: true, },
      { label: "ESTADO", property: "estado", type: "text", visible: true },
      { label: "LEGAJO", property: "legajo", type: "text", visible: true },
      { label: "DECRETO", property: "decreto", type: "text", visible: true },
      { label: "CONVENIO SC ECONOMICAS", property: "convenioScEconomicas", type: "boolean", visible: true },
      { label: "INSCRIPCION AFIP", property: "inscripcion_afip", type: "boolean", visible: true },
      { label: "INSCRIPCION RENTAS", property: "inscripcion_rentas", type: "boolean", visible: true },
      { label: "INSCRIPCION RENACOPES", property: "inscripcion_renacopes", type: "boolean", visible: true },
      { label: "FK_KIOSCO", property: "fk_kiosco", type: "text", visible: false },
    ];
  }

  private setSearchOptions() {
    this.searchOptions = [
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: "cue",
        label: "CUE",
        readonly: false,
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: "region",
        label: "Region",
        readonly: false,
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: "nivel",
        label: "Nivel",
        readonly: false,
      }),
    ];
  }
}
