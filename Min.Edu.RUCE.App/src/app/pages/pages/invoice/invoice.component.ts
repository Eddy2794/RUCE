import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterOptions } from '@app/shared/utils';
import { CooperadoraModel } from '@app/pages/ruce/cooperadora/Models/cooperadora-model';
import { CooperadoraService } from '@app/pages/ruce/cooperadora/Services/cooperadora.service';
import { ObserverCooperadoraService } from '@app/pages/ruce/cooperadora/Services/observer-cooperadora.service';
import { AutoridadOrganizacionRUCEModel } from '@app/pages/ruce/autoridadesorganizacion/Models/autoridad-organizacionruce-model';
import { AutoridadOrganizacionRUCEService } from '@app/pages/ruce/autoridadesorganizacion/Services/autoridad-organizacionruce.service';
import { AutoridadComisionService } from '@app/pages/ruce/autoridadescomision/Service/autoridad-comision.service';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
// import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { ConstanciaService } from './Service/constancia.service';
import { ConstanciaModel } from './Model/constancia-model';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CoopConstanciaService } from './Service/coop-constancia.service';

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
  autoridad?: Array<AutoridadOrganizacionRUCEModel>;
  idCooperadora?: number;
  idOrganizacion?: number;
  directorInst?: string;
  idComision?: number;
  tableData = [];

  columnas: string[] = ['cargo', 'apellido', 'nombre', 'cuil'];

  suscriptionIdCooperadora: Subscription;

  filtro: FilterOptions = { estaActivo: true, filtros: null};

  idConstancia?: number;
  urlConstancia?: string='';
  constancia?: ConstanciaModel;
  datos?: any;

  constructor(
    private cooperadoraService: CooperadoraService,
    private observerIdCooperadora: ObserverCooperadoraService,
    private autoridadService: AutoridadOrganizacionRUCEService,
    private autoridadesComisionService: AutoridadComisionService,
    private constanciaService: ConstanciaService,
    private coopConstanciaService: CoopConstanciaService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) {
    this.suscriptionIdCooperadora = this.observerIdCooperadora.castIdCooperadora.subscribe((value)=>{
      this.idCooperadora = value;
    });
    // this.urlConstancia = location.prepareExternalUrl(location.path());
  }

  ngOnDestroy(): void {
    this.suscriptionIdCooperadora.unsubscribe();
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe((parameter: any) => {
      this.idConstancia = parameter[1]?parseInt(parameter[1].path):undefined;
      if(this.idConstancia){
        this.cargarConstancia();
      } else {
        this.cargarConstanciaCoop();
      }
      // this.cargarAutoridadesComision();
    });
  }

  cargarAutoridadesComision(autoridades: any): void {
    const datos = autoridades.map(autoridad => {
      const dato: any = {};

      dato['cargo'] = autoridad.ref_cargo[0]?.cargoDesc;
      dato['apellido'] = autoridad.persona_r_u_c_e[0].apellido;
      dato['nombre'] = autoridad.persona_r_u_c_e[0].nombre;
      dato['cuil'] = autoridad.persona_r_u_c_e[0].cuil;
      return dato;
    });

    datos.sort((a, b) => {
      if (a.cargo < b.cargo) return -1;
      if (a.cargo > b.cargo) return 1;
      return 0;
    });

    this.tableData = datos;
  }

  private cargarConstanciaCoop(){
    this.coopConstanciaService.findOne(this.idCooperadora).subscribe((resp:any)=>{
      this.urlConstancia = document.location.origin+this.location.prepareExternalUrl(this.location.path())+'/'+resp.comprobante?.id;
      this.cargarAutoridadesComision(resp.comprobante.datos.comision[0].autoridad_comision);
      this.datos = resp.comprobante.datos;
      console.log(this.datos)
    });
  }

  private async cargarConstancia(){
    this.constanciaService.findOne(this.idConstancia).subscribe((resp:any)=>{
      this.cargarAutoridadesComision(resp.datos.comision[0].autoridad_comision);
      this.datos = resp.datos;
    });
  }

}

