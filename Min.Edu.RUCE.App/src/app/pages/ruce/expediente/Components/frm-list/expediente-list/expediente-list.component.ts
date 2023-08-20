import { ObserverCooperadoraService } from "./../../../../cooperadora/Services/observer-cooperadora.service";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AutoridadComisionModel } from "@app/pages/ruce/autoridadescomision/Model/autoridad-comision-model";
import { FilterOptions } from "@app/shared/utils";
import { SearchOptionsGeneric } from "@app/shared/utils/search-options-generic";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";

import { ExpedienteService } from "../../../Services/expediente.service";
import { AuditService } from "./../../../../refruce/audit/Service/audit.service";
import { Subscription } from "rxjs";

@Component({
  selector: "vex-expediente-list",
  templateUrl: "./expediente-list.component.html",
  styleUrls: ["./expediente-list.component.scss"],
})
export class ExpedienteListComponent implements OnInit, OnDestroy {
  @Input() idCooperadora!: number;

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = {
    estaActivo: true,
    modelo: "Expediente",
    id: this.idExpediente,
  };
  columnasVex: TableColumn<AutoridadComisionModel>[];

  suscriptionIdExpediente: Subscription;
  idExpediente?: number;

  constructor(
    private route: ActivatedRoute,
    protected auditService: AuditService,
    private observerCooperadora: ObserverCooperadoraService
  ) {
    this.suscriptionIdExpediente =
      this.observerCooperadora.castIdExpediente.subscribe((value) => {
        this.idExpediente = value;
      });
    this.filtro = {
      estaActivo: true,
      modelo: "Expediente",
      id: this.idExpediente,
    };
  }

  ngOnInit(): void {
    this.obtenerBusqueda();
  }

  ngOnDestroy(): void {
    this.suscriptionIdExpediente.unsubscribe();
  }

  obtenerBusqueda() {
    this.filtro = {
      estaActivo: true,
      PageSize: 10,
      modelo: "Expediente",
      id: this.idExpediente,
    };
    this.cargarList();
  }

  cargarList() {
    this.setColumns();
  }

  private setColumns() {
    this.columnasVex = [
      { label: "ACCIONES", property: "actions", type: "button", visible: true },
      {
        label: "NRO DE EXPEDIENTE",
        property: "expeiente.nroExpediente",
        type: "object",
        visible: true,
      },
      {
        label: "CANT. DE OBSERVACIONES.",
        property: "expediente.fkPersonaRUCE.documento",
        type: "object",
        visible: true,
      },
      {
        label: "OBSERVACIUONES",
        property: "fexpediente.kPersonaRUCE.nombre",
        type: "object",
        visible: true,
      },
      {
        label: "OBSERVACIUONES RESPODNDIDAS",
        property: "expediente.fkPersonaRUCE.apellido",
        type: "object",
        visible: true,
      },
    ];
  }
}
