import { Component, OnDestroy, OnInit } from '@angular/core';
import { KioscoModel } from '../../Models/kiosco-model';
import { Subscription } from 'rxjs';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { KioscoService } from '../../Services/kiosco.service';
import { ActivatedRoute } from '@angular/router';
import { ObserverCooperadoraService } from '@app/pages/ruce/cooperadora/Services/observer-cooperadora.service';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';

@Component({
  selector: 'vex-encabezado-kiosco',
  templateUrl: './encabezado-kiosco.component.html',
  styleUrls: ['./encabezado-kiosco.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class EncabezadoKioscoComponent implements OnInit, OnDestroy {

  kiosco?: KioscoModel;
  idCooperadora: number = 0;
  idKiosco: number = 0;
  suscriptionIdCooperadora?: Subscription;

  filtro: FilterOptions = { estaActivo: true, filtros: "" };
  columnasVex: TableColumn<KioscoModel>[];
  searchOptions!: SearchOptionsGeneric[];

  datosShow: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private personeriaService: KioscoService,
    protected observerCooperadora: ObserverCooperadoraService
  ) {
  }
  ngOnDestroy(): void {
    this.suscriptionIdCooperadora.unsubscribe();
  }

  ngOnInit(): void {
    this.idCooperadora = this.route.snapshot.params["id"];
    this.obtenerData(this.idCooperadora);
    this.kiosco = {};
    this.suscriptionIdCooperadora =
      this.observerCooperadora.castIdPersoneria.subscribe((value) => {
        if (value) this.idKiosco = value;
      });
  }

  private obtenerData(id: any): void {
    this.personeriaService.findOne(id).subscribe((res: any) => {
      this.kiosco = Object.assign({}, this.kiosco, res.entities);
      this.idKiosco = this.kiosco?.id;
      this.datosShow = true;
    });
  }

}
