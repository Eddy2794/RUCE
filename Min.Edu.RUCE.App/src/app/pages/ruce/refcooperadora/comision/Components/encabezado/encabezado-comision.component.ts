import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComisionModel } from './../../Models/comision-model';
import { ComisionService } from '../../Services/comision.service';
import { AutoridadComisionService } from '../../Services/autoridad-comision.service';
import { FilterOptions } from '@app/shared/utils';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { AutoridadComisionModel } from '../../Models/autoridad-comision-model';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';

@Component({
  selector: 'vex-encabezado-comision',
  templateUrl: './encabezado-comision.component.html',
  styleUrls: ['./encabezado-comision.component.scss']
})
export class EncabezadoComisionComponent implements OnInit {

  comision?: ComisionModel;
  idCooperadora?: number;
  idComision?: number;

  filtro: FilterOptions = {estaActivo: true, filtros:""};
  columnasVex: TableColumn<AutoridadComisionModel>[];
  searchOptions!: SearchOptionsGeneric[];

  deshabilitarCarga!: boolean;

  constructor(
    private route:ActivatedRoute, 
    private comisionService: ComisionService,
    protected autoridadService: AutoridadComisionService,
  ) {
    this.comision={}
   }

   ngOnInit(): void {
    this.idCooperadora = this.route.snapshot.params['id'];
    this.obtenerData(this.idCooperadora);
  }

  private obtenerData(id:any){
    this.comisionService.findOne(id).subscribe(
      (res:any) => {
        this.comision = Object.assign({}, this.comision, res.entities);
        this.deshabilitarCarga = false;
        this.idComision = this.comision.id;
        this.obtenerAutoridades();
      },
      (err:any) => {
        this.deshabilitarCarga = true;
      }
    );
  }
  
  obtenerAutoridades(): void {
    this.filtro = { estaActivo: true, PageSize: 10, filtros:'{"fkComision":"'+this.idComision+'"}'};
    this.cargarList();
  }

  cargarList(): void {
    this.setColumns();
    this.setSearchOptions();
  }

  private setColumns(): void {
    this.columnasVex = [
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true },
      { label: 'CUIL', property: 'persona_r_u_c_e.0.cuil', type: 'object', visible: true },
      { label: 'DNI', property: 'persona_r_u_c_e.0.documento', type: 'object', visible: true },
      { label: 'NOMBRE', property: 'persona_r_u_c_e.0.nombre', type: 'object', visible: true },
      { label: 'APELLIDO', property: 'persona_r_u_c_e.0.apellido', type: 'object', visible: true },
      { label: 'EMAIL', property: 'persona_r_u_c_e.0.email', type: 'object', visible: true },
      { label: 'TELEFONO', property: 'persona_r_u_c_e.0.telefono', type: 'object', visible: true },
      { label: 'CARGO', property: 'ref_cargo.0.cargoDesc', type: 'object', visible: true },
      { label: 'INICIO DE CARGO', property: 'inicioCargo', type: 'date', visible: true },
      { label: 'FIN DE CARGO', property: 'finCargo', type: 'date', visible: true },
    ]
  }

  private setSearchOptions() {
    this.searchOptions = [
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: "nombre",
        label: "NOMBRE",
        readonly: false,
      }),
    ];
  }
}
