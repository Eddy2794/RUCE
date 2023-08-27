import { ObserverCooperadoraService } from "./../../../../cooperadora/Services/observer-cooperadora.service";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AutoridadComisionModel } from "@app/pages/ruce/autoridadescomision/Model/autoridad-comision-model";
import { FilterOptions } from "@app/shared/utils";
import { SearchOptionsGeneric } from "@app/shared/utils/search-options-generic";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";

import { Subscription } from "rxjs";
import { AuditService } from "@app/pages/ruce/refruce/audit/Service/audit.service";

@Component({
  selector: "vex-expediente-list",
  templateUrl: "./expediente-list.component.html",
  styleUrls: ["./expediente-list.component.scss"],
})
export class ExpedienteListComponent implements OnInit, OnDestroy {
  idCooperadora!: number;

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = {estaActivo: true, filtros:null}
    // modelo: "Expediente",
    // id: this.idExpediente,
  //};
  columnasVex: TableColumn<AutoridadComisionModel>[];

  suscriptionIdExpediente: Subscription;
  idExpediente: number = 0;

  constructor(
    private route: ActivatedRoute,
    protected auditService: AuditService,
    private observerCooperadora: ObserverCooperadoraService
  ) {
    // this.filtro = {
    //   estaActivo: true,
    //   modelo: "Expediente",
    //   id: this.idExpediente,
    // };
  }

  ngOnInit(): void {
    this.suscriptionIdExpediente =
      this.observerCooperadora.castIdExpediente.subscribe((value) =>{
        if (value)
          this.idExpediente = value;
      });
    this.suscriptionIdExpediente =
    this.observerCooperadora.castIdCooperadora.subscribe((value) => {
      this.idCooperadora = value;
    });
    this.obtenerBusqueda();
  }

  ngOnDestroy(): void {
    this.suscriptionIdExpediente.unsubscribe();
  }

  obtenerBusqueda() {
    this.filtro = { estaActivo: true, PageSize: 10, id: this.idExpediente };
    this.cargarList();
  }

  cargarList() {
    this.setColumns();
  }

  private setColumns() {
    this.columnasVex = [
      //{ label: "ACCIONES", property: "actions", type: "button", visible: true },
      {
        label: "NRO DE EXPEDIENTE",
        property: "expediente.nroExpediente",
        type: "object",
        visible: true,
      },
      {
        label: "CANT. DE OBSERVACIONES.",
        property: "expediente.cantObservaciones",
        type: "object",
        visible: true,
      },
      {
        label: "OBSERVACIUONES",
        property: "expediente.observacionesDesc",
        type: "object",
        visible: true,
      },
      {
        label: "OBSERVACIUONES RESPODNDIDAS",
        property: "expediente.observacionesRespondidas",
        type: "boolean",
        visible: true,
      },
      {
        label: "INSTANCIA INSTRUMENTO",
        property: "expediente.fkRefInstanciaInstrumento",
        type: "object",
        visible: true,
      },
    ];
  }
}
