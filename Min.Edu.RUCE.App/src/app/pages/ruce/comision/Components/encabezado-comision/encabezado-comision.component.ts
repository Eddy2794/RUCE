import { Component, OnInit } from '@angular/core';
import { ComisionModel } from '../../Models/comision-model';
import { FilterOptions } from '@app/shared/utils';
import { AutoridadComisionModel } from '@app/pages/ruce/autoridadescomision/Model/autoridad-comision-model';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { ActivatedRoute } from '@angular/router';
import { ComisionService } from '../../Services/comision.service';
import { AutoridadComisionService } from '@app/pages/ruce/autoridadescomision/Service/autoridad-comision.service';
import { ObserverComisionService } from '../../Services/observer-comision.service';

@Component({
  selector: 'vex-encabezado-comision',
  templateUrl: './encabezado-comision.component.html',
  styleUrls: ['./encabezado-comision.component.scss']
})
export class EncabezadoComisionComponent implements OnInit {

  comision?: ComisionModel;
  idCooperadora?: number = 0;
  idComision?: number=1;

  filtro: FilterOptions = {estaActivo: true, filtros:""};
  columnasVex: TableColumn<AutoridadComisionModel>[];
  searchOptions!: SearchOptionsGeneric[];

  datosShow:boolean = false;

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

  private obtenerData(id:any):void{
    this.comisionService.findOne(id).subscribe(
      (res:any) => {
        this.comision = Object.assign({}, this.comision, res.entities);
        this.idComision = this.comision.id;
        this.observerIdComision.enviarIdComision(this.idComision);
        this.datosShow = true;
      },
    );
  }

}
