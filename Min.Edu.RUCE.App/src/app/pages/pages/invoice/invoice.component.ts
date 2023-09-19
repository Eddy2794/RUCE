import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { DataPage, FilterOptions } from '@app/shared/utils';
import { CooperadoraService } from '@app/pages/ruce/cooperadora/Services/cooperadora.service';
import { CooperadoraModel } from '@app/pages/ruce/cooperadora/Models/cooperadora-model';
import { Subscription } from 'rxjs';
import { ObserverCooperadoraService } from '@app/pages/ruce/cooperadora/Services/observer-cooperadora.service';
import { AutoridadOrganizacionRUCEService } from '@app/pages/ruce/autoridadesorganizacion/Services/autoridad-organizacionruce.service';
import { AutoridadOrganizacionRUCEModel } from '@app/pages/ruce/autoridadesorganizacion/Models/autoridad-organizacionruce-model';
import { AutoridadComisionService } from '@app/pages/ruce/autoridadescomision/Service/autoridad-comision.service';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';

@Component({
  selector: 'vex-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class InvoiceComponent implements OnInit, OnDestroy {

  cooperadora?: CooperadoraModel;
  autoridad?: AutoridadOrganizacionRUCEModel;
  idCooperadora?: number;
  idOrganizacion?: number;
  directorInst?: string;
  idComision?: number;
  tableData = [];

  columnas: string[] = ['cargo', 'apellido', 'nombre', 'cuil'];

  suscriptionIdCooperadora: Subscription;

  filtro: FilterOptions = { estaActivo: true, filtros: null};

  constructor(
    private cooperadoraService: CooperadoraService,
    private observerIdCooperadora: ObserverCooperadoraService,
    private autoridadService: AutoridadOrganizacionRUCEService,
    private autoridadesComisionService: AutoridadComisionService

  ) {
    this.suscriptionIdCooperadora = this.observerIdCooperadora.castIdCooperadora.subscribe((value)=>{
      this.idCooperadora = value;
    });
  }
  ngOnDestroy(): void {
    this.suscriptionIdCooperadora.unsubscribe();
  }

  ngOnInit() {
    this.cargarCooperadora();
    //this.cargarAutoridadesComision();
  }
  cargarAutoridadesComision(idCom: number): void {
    this.filtro = { estaActivo: true, PageSize: 10, fkComision:idCom};
    this.autoridadesComisionService.filter(this.filtro).subscribe((res: any) => {
      const datos = res.entities.map(autoridad => {
        const dato: any = {};
  
        dato['cargo'] = autoridad.ref_cargo[0]?.cargoDesc;
        dato['apellido'] = autoridad.persona_r_u_c_e[0].apellido;
        dato['nombre'] = autoridad.persona_r_u_c_e[0].nombre;
        dato['cuil'] = autoridad.persona_r_u_c_e[0].cuil;
        dato['periodoInicio'] = autoridad.comision.periodoInicio;
        dato['periodoFin'] = autoridad.comision.periodoFin;
        return dato;
      });

      datos.sort((a, b) => {
        if (a.cargo < b.cargo) return -1;
        if (a.cargo > b.cargo) return 1;
        return 0;
      });
  
      this.tableData = datos;
    });
  }

  private cargarCooperadora() {
    this.cooperadoraService.findOne(this.idCooperadora).subscribe((res:any) => {
      this.cooperadora = Object.assign({}, this.cooperadora, res.entities);
      this.idOrganizacion = this.cooperadora.organizacion_r_u_c_e.id;
      this.idComision = this.cooperadora.comision[0].id;
      this.cargarAutoridad(this.idOrganizacion);
      this.cargarAutoridadesComision(this.idComision);
    });
  }

  private cargarAutoridad(id: number){
    this.filtro = { estaActivo: true, PageSize: 10, fkOrganizacionRUCE:id};
    this.autoridadService.filter(this.filtro).subscribe((res:any) => {
      this.autoridad = Object.assign({}, this.autoridad, res.entities);

      const propiedadesNumericas = Object.keys(this.autoridad);

      for (const propiedad of propiedadesNumericas) {
        const objeto = this.autoridad[propiedad];
        if(objeto.ref_cargo[0].cargoDesc === 'DIRECTOR')
        this.directorInst = this.autoridad[0].persona_r_u_c_e[0].apellido +' '+this.autoridad[0].persona_r_u_c_e[0].nombre;
      }
    });
  }

}

