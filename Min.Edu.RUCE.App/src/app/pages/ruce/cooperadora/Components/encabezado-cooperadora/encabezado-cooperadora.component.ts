import { CooperadoraService } from '../../Services/cooperadora.service';
import { Component, OnInit } from '@angular/core';
import { CooperadoraModel } from '../../Models/cooperadora-model';
import { ActivatedRoute } from '@angular/router';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';

@Component({
  selector: 'vex-encabezado-cooperadora',
  templateUrl: './encabezado-cooperadora.component.html',
  styleUrls: ['./encabezado-cooperadora.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class EncabezadoCooperadoraComponent implements OnInit {

  cooperadora?: CooperadoraModel;
  id?: number;
  estadoCooperadora?: string;

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

  getBackgroundColor(estado: string): string {
    if (estado === 'verde') {
      return 'hsl(120, 50%, 85%)'; // Cambia esto al color que desees
    } else if (estado === 'rojo') {
      return 'hsl(0, 50%, 85%)'; // Cambia esto al color que desees
    } else {
      return 'hsl(60, 50%, 85%)'; // Color predeterminado o transparente
    }
  }

}
