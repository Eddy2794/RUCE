import { OrganizacionRUCEModel } from '../../Models/OrganizacionRUCE/organizacionruce-model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrganizacionRUCEService } from '../../Services/OrganizacionRUCE/organizacionruce-service.service';

@Component({
  selector: 'vex-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {
  data?: OrganizacionRUCEModel;
  id?: string;
  constructor(
    private route:ActivatedRoute, 
    private organizacionRUCEService:OrganizacionRUCEService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.obtenerData(this.id)
  }

  private obtenerData(id:any){
    this.organizacionRUCEService.findOne(id).subscribe((res:any) => {
      this.data = Object.assign({}, res.entities[0], this.data);
    });
  }

}
