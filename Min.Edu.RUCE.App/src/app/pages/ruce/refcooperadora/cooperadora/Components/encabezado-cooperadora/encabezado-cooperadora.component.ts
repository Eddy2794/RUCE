import { CooperadoraService } from './../../Services/Cooperadora/cooperadora.service';
import { Component, OnInit } from '@angular/core';
import { CooperadoraModel } from '../../Models/Cooperadora/cooperadora-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vex-encabezado-cooperadora',
  templateUrl: './encabezado-cooperadora.component.html',
  styleUrls: ['./encabezado-cooperadora.component.scss']
})
export class EncabezadoCooperadoraComponent implements OnInit {

  cooperadora?: CooperadoraModel;
  id?: number;

  constructor(
    private route:ActivatedRoute, 
    private cooperadoraService:CooperadoraService
  ) {
    this.cooperadora={}
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.obtenerData(this.id)
  }

  private obtenerData(id:any){
    this.cooperadoraService.findOne(id).subscribe((res:any) => {
      this.cooperadora = Object.assign({}, this.cooperadora, res.entities);
    });
  }

}
