import { CooperadoraService } from "../../Services/cooperadora.service";
import { CooperadoraModel } from "../../Models/cooperadora-model";
import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";

import { MatDialog } from "@angular/material/dialog";
import { SearchOptionsGeneric, TypeControl, TypeData, } from "@app/shared/utils/search-options-generic";
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
      //{ label: "CÓDIGO", property: "id", type: "text", visible: false },
      { label: "CUE INSTITUCIÓN", property: "organizacion_r_u_c_e.cue", type: "object", visible: true, },
      { label: "DENOMINACION", property: "denominacion", type: "text", visible: true, },
      { label: "ESTADO", property: "estado", type: "text", visible: true },
      { label: "LEGAJO", property: "legajo", type: "text", visible: true },
      { label: "CONVENIO SC ECONOMICAS", property: "convenioCsEconomicas", type: "boolean", visible: true },
      { label: "INSCRIPCION AFIP", property: "estadoAfip", type: "boolean", visible: true },
      { label: "INSCRIPCION RENTAS", property: "estadoRentas", type: "boolean", visible: true },
      { label: "INSCRIPCION RENACOPES", property: "inscripcionRenacopes", type: "boolean", visible: true },
      { label: "KIOSCO", property: "fkKiosco", type: "object", visible: false },
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
