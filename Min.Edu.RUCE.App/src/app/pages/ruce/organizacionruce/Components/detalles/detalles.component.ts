import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrganizacionRUCEModel } from '../../Models/organizacionruce-model';
import { OrganizacionRUCEService } from '../../Services/organizacionruce-service.service';
import { ObserverOrganizacionService } from '../../Services/observer-organizacion.service';

@Component({
  selector: 'vex-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {
  data?: OrganizacionRUCEModel;
  id?: number;
  autoridadesShow?: boolean = false;
  constructor(
    private route:ActivatedRoute, 
    private organizacionRUCEService:OrganizacionRUCEService,
    protected observerIdOrganizacion: ObserverOrganizacionService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.obtenerData(this.id)
  }

  private obtenerData(id:any){
    this.organizacionRUCEService.findOne(id).subscribe((res:any) => {
      this.data = Object.assign({}, res.entities[0], this.data);
      this.observerIdOrganizacion.enviarIdOrganizacion(this.data.id);
      this.autoridadesShow = true;
    });
  }

}
