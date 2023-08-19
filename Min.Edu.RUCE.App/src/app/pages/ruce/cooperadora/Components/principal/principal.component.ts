import { Component, OnInit } from '@angular/core';
import { CooperadoraModel } from '../../Models/cooperadora-model';
import { ActivatedRoute } from '@angular/router';
import { CooperadoraService } from '../../Services/cooperadora.service';
import { ObserverCooperadoraService } from '../../Services/observer-cooperadora.service';

@Component({
  selector: 'vex-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  cooperadora?: CooperadoraModel;
  id?: number;

  constructor(
    private route:ActivatedRoute,
    private cooperadoraService:CooperadoraService,
    private observerCooperadora: ObserverCooperadoraService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.obtenerData(this.id)
  }
  obtenerData(id: number) {
    this.cooperadoraService.findOne(id).subscribe((res:any)=>{
      this.cooperadora = Object.assign(res.entities,this.cooperadora);
      console.log(this.cooperadora);
      this.observerCooperadora.enviarIdCooperadora(this.cooperadora.id);
      this.observerCooperadora.enviarTipoAsociacion(this.cooperadora.fkRefTipoAsociacion);
      this.observerCooperadora.enviarIdExpediente(this.cooperadora.expediente.id);
    })
  }

}
