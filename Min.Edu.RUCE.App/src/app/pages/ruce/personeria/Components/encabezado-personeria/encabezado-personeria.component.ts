import { Component, OnDestroy, OnInit } from "@angular/core";
import { PersoneriaService } from "../../Services/personeria.service";
import { ActivatedRoute } from "@angular/router";
import { SearchOptionsGeneric } from "@app/shared/utils/search-options-generic";
import { PersoneriaModel } from "../../Models/personeria-model";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { FilterOptions } from "@app/shared/utils";
import { Subscription } from "rxjs";
import { ObserverCooperadoraService } from "@app/pages/ruce/cooperadora/Services/observer-cooperadora.service";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";

@Component({
  selector: "vex-encabezado-personeria",
  templateUrl: "./encabezado-personeria.component.html",
  styleUrls: ["./encabezado-personeria.component.scss"],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class EncabezadoPersoneriaComponent implements OnInit, OnDestroy {
  personeria?: PersoneriaModel;
  idCooperadora: number = 0;
  idPersoneria: number = 0;
  tipoAsociacionDesc?: string;
  descPersoneria?: string;
  suscriptionIdPersoneria?: Subscription;
  suscriptionTipoAsociacionDesc?: Subscription;

  filtro: FilterOptions = { estaActivo: true, filtros: "" };
  columnasVex: TableColumn<PersoneriaModel>[];
  searchOptions!: SearchOptionsGeneric[];

  datosShow: boolean = false;
  datosPersoneria: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private personeriaService: PersoneriaService,
    protected observerCooperadora: ObserverCooperadoraService
  ) {
    this.personeria = {};
    this.suscriptionIdPersoneria =
      this.observerCooperadora.castIdPersoneria.subscribe((value) => {
        if (value) this.idPersoneria = value;
      });
    
    this.suscriptionTipoAsociacionDesc = 
      this.observerCooperadora.castTipoAsociacionDesc.subscribe((value) => {
        if (value) this.tipoAsociacionDesc = value;
      });
  }
  ngOnDestroy(): void {
    this.suscriptionIdPersoneria.unsubscribe();
    this.suscriptionTipoAsociacionDesc.unsubscribe();
  }

  ngOnInit(): void {
    this.idCooperadora = this.route.snapshot.params["id"];
    this.obtenerData(this.idCooperadora);
    this.tipoAsociacion();
  }

  private obtenerData(id: any): void {
    this.personeriaService.findOne(id).subscribe((res: any) => {
      this.personeria = Object.assign({}, this.personeria, res.entities);
      this.idPersoneria = this.personeria?.id;
      this.datosShow = true;
    });
  }

  private tipoAsociacion(): void {
    switch(this.tipoAsociacionDesc){
      case "SIMPLE":
        this.descPersoneria = "ESCOLAR";
        this.datosPersoneria = true;
      break;
      case "CIVIL":
        this.descPersoneria = "JURIDICA";
      break;
    }
  }
}
