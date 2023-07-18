import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComisionModel } from './../../Models/comision-model';
import { ComisionService } from '../../Services/comision.service';

@Component({
  selector: 'vex-encabezado-comision',
  templateUrl: './encabezado-comision.component.html',
  styleUrls: ['./encabezado-comision.component.scss']
})
export class EncabezadoComisionComponent implements OnInit {

  comision?: ComisionModel;
  id?: number;

  constructor(
    private route:ActivatedRoute, 
    private comisionService: ComisionService
  ) {
    this.comision={}
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.obtenerData(this.id)
  }

  private obtenerData(id:any){
    this.comisionService.findOne(id).subscribe((res:any) => {
      this.comision = Object.assign({}, this.comision, res.entities);
    });
  }

}
