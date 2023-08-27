import { Component, OnInit } from '@angular/core';
import { CooperadoraModel } from '../../Models/cooperadora-model';
import { ActivatedRoute } from '@angular/router';
import { CooperadoraService } from '../../Services/cooperadora.service';
import { ObserverCooperadoraService } from '../../Services/observer-cooperadora.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'vex-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  cooperadora?: CooperadoraModel;
  id?: number;
  cargarInfo0: boolean = false;
  cargarInfo1: boolean = false;
  cargarInfo2: boolean = false;
  cargarInfo3: boolean = false;
  cargarInfo4: boolean = false;
  cargarInfo5: boolean = false;
  cargarInfo6: boolean = false;

  constructor(
    private route:ActivatedRoute,
    private cooperadoraService:CooperadoraService,
    private observerCooperadora: ObserverCooperadoraService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.cargarInfo0=true;
    this.obtenerData(this.id)
  }
  obtenerData(id: number) {
    this.cooperadoraService.findOne(id).subscribe((res:any)=>{
      this.cooperadora = Object.assign(res.entities,this.cooperadora);
      this.observerCooperadora.enviarIdCooperadora(this.cooperadora.id);
      this.observerCooperadora.enviarTipoAsociacion(this.cooperadora.fkRefTipoAsociacion);
      this.observerCooperadora.enviarIdExpediente(this.cooperadora.expediente?.id);
      this.observerCooperadora.enviarIdPersoneria(this.cooperadora.personeria?.id);
    })
  }

  cargarInformacion(event: MatTabChangeEvent) {
    const pestaña = event.index;
    switch(pestaña){
      case 0:
        this.cargarInfo0 = true;
        this.cargarInfo1 = false;
        this.cargarInfo2 = false;
        this.cargarInfo3 = false;
        this.cargarInfo4 = false;
        this.cargarInfo5 = false;
        this.cargarInfo6 = false;
      break;
      case 1:
        this.cargarInfo1 = true;
        this.cargarInfo0 = false;
        this.cargarInfo2 = false;
        this.cargarInfo3 = false;
        this.cargarInfo4 = false;
        this.cargarInfo5 = false;
        this.cargarInfo6 = false;
      break;
      case 2:
        this.cargarInfo2 = true;
        this.cargarInfo0 = false;
        this.cargarInfo1 = false;
        this.cargarInfo3 = false;
        this.cargarInfo4 = false;
        this.cargarInfo5 = false;
        this.cargarInfo6 = false;
      break;
      case 3:
        this.cargarInfo3 = true;
        this.cargarInfo0 = false;
        this.cargarInfo2 = false;
        this.cargarInfo1 = false;
        this.cargarInfo4 = false;
        this.cargarInfo5 = false;
        this.cargarInfo6 = false;
      break;
      case 4:
        this.cargarInfo4 = true;
        this.cargarInfo0 = false;
        this.cargarInfo2 = false;
        this.cargarInfo3 = false;
        this.cargarInfo1 = false;
        this.cargarInfo5 = false;
        this.cargarInfo6 = false;
      break;
      case 5:
        this.cargarInfo5 = true;
        this.cargarInfo0 = false;
        this.cargarInfo2 = false;
        this.cargarInfo3 = false;
        this.cargarInfo4 = false;
        this.cargarInfo1 = false;
        this.cargarInfo6 = false;
      break;
      case 6:
        this.cargarInfo6 = true;
        this.cargarInfo0 = false;
        this.cargarInfo2 = false;
        this.cargarInfo3 = false;
        this.cargarInfo4 = false;
        this.cargarInfo5 = false;
        this.cargarInfo1 = false;
      break;
    }
  }

}
