import { Component, OnInit } from '@angular/core';
import { CooperadoraModel } from '../../Models/Cooperadora/cooperadora-model';
import { ActivatedRoute } from '@angular/router';
import { CooperadoraService } from '../../Services/Cooperadora/cooperadora.service';

@Component({
  selector: 'vex-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  cooperadora?: CooperadoraModel;
  id?: string;

  constructor(
    private route:ActivatedRoute,
    private cooperadoraService:CooperadoraService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.obtenerData(this.id)
  }
  obtenerData(id: any) {
    this.cooperadoraService.findOne(id).subscribe((res:any)=>{
      this.cooperadora = Object.assign({},res.entities[0],this.cooperadora);
      console.log(this.cooperadora);
    })
    throw new Error('Method not implemented.');
  }

}
