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
import { OrganizacionRUCEModel } from "../../Models/organizacionruce-model";
import { OrganizacionRUCEService } from "../../Services/organizacionruce-service.service";

@Component({
  selector: "app-organizacionruce-list",
  templateUrl: "./organizacionruce-list.component.html",
  styleUrls: ["./organizacionruce-list.component.scss"],
})
export class OrganizacionRUCEListComponent implements OnInit {
  searchOptions!: SearchOptionsGeneric[];
  filtro: FilterOptions = { estaActivo: true };
  refOrganizacionRUCE: OrganizacionRUCEModel[] = [];
  columnasVex: TableColumn<OrganizacionRUCEModel>[];

  constructor(
    protected organizacionRUCEService: OrganizacionRUCEService,
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
