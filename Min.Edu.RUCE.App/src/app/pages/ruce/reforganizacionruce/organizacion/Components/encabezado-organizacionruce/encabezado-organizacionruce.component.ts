import { Component, OnInit } from '@angular/core';
import { OrganizacionRUCEModel } from '../../Models/OrganizacionRUCE/organizacionruce-model';
import { ActivatedRoute } from '@angular/router';
import { OrganizacionRUCEService } from '../../Services/OrganizacionRUCE/organizacionruce-service.service';

@Component({
  selector: 'vex-encabezado-organizacionruce',
  templateUrl: './encabezado-organizacionruce.component.html',
  styleUrls: ['./encabezado-organizacionruce.component.scss']
})
export class EncabezadoOrganizacionruceComponent implements OnInit {

  organizacionruce?: OrganizacionRUCEModel;
  id?: string;

  constructor(
    private route:ActivatedRoute,
    private organizacionRUCEService:OrganizacionRUCEService
  ) { 
    this.organizacionruce = {}
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.obtenerData(this.id)
  }
  obtenerData(id: any) {
    this.organizacionRUCEService.findOne(id).subscribe((res:any)=>{
      this.organizacionruce = Object.assign(this.organizacionruce,res.entities);
    });
  }

}