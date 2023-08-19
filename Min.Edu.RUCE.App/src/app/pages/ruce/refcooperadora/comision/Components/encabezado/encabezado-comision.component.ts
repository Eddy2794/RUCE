import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComisionModel } from './../../Models/comision-model';
import { ComisionService } from '../../Services/comision.service';
import { AutoridadComisionService } from '../../Services/autoridad-comision.service';
import { FilterOptions } from '@app/shared/utils';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { AutoridadComisionModel } from '../../Models/autoridad-comision-model';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';
import { ObserverComisionService } from '../../Services/observer-comision.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vex-encabezado-comision',
  templateUrl: './encabezado-comision.component.html',
  styleUrls: ['./encabezado-comision.component.scss']
})
export class EncabezadoComisionComponent implements OnInit, OnDestroy {

  comision?: ComisionModel;
  idCooperadora?: number;
  idComision?: number;

  filtro: FilterOptions = {estaActivo: true, filtros:""};
  columnasVex: TableColumn<AutoridadComisionModel>[];
  searchOptions!: SearchOptionsGeneric[];

  deshabilitarCarga!: boolean;

  suscriptionIdComision: Subscription;

  comisionShow:boolean = false;

  constructor(
    private route:ActivatedRoute, 
    private comisionService: ComisionService,
    protected autoridadService: AutoridadComisionService,
    protected observerIdComision: ObserverComisionService,
  ) {
    this.comision={}
   }
  ngOnDestroy(): void {
  }

   ngOnInit(): void {
    this.idCooperadora = this.route.snapshot.params['id'];
    this.obtenerData(this.idCooperadora);
  }

  private obtenerData(id:any){
    this.comisionService.findOne(id).subscribe(
      (res:any) => {
        this.comision = Object.assign({}, this.comision, res.entities);
        this.idComision = this.comision.id;
        this.observerIdComision.enviarIdComision(this.idComision);
        this.comisionShow = true;
        console.log(this.comision);
      },
    );
  }

}
