import { EstablecimientoService } from "../../../Services/Establecimiento/establecimiento-service.service";
import { EstablecimientoModel } from "../../../Models/Establecimiento/establecimiento-model";
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
  selector: "app-establecimiento",
  templateUrl: "./establecimiento-list.component.html",
  styleUrls: ["./establecimiento-list.component.scss"],
})
export class EstablecimientoListComponent implements OnInit {
  searchOptions!: SearchOptionsGeneric[];
  filtro: FilterOptions = { estaActivo: true };
  refEstablecimiento: EstablecimientoModel[] = [];
  columnasVex: TableColumn<EstablecimientoModel>[];

  constructor(
    protected establecimientoService: EstablecimientoService,
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
