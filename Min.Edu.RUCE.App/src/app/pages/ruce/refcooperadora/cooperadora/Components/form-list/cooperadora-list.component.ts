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
