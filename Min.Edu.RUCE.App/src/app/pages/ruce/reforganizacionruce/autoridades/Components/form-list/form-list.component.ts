import { Component, OnInit } from '@angular/core';
import { DataPage, FilterOptions, PaginateOptions } from '@app/shared/utils';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { AutoridadOrganizacionRUCEModel } from '../../Models/AutoridadOrganizacionRUCE/autoridad-organizacionruce-model';
import { OrganizacionRUCEModel } from '../../../organizacion/Models/OrganizacionRUCE/organizacionruce-model';
import { AutoridadOrganizacionRUCEService } from '../../Services/AutoridadOrganizacionRUCE/autoridad-organizacionruce.service';
import { MatDialog } from '@angular/material/dialog';
import { PersonaRUCEModel } from '@app/pages/ruce/ref-ruce/Model/persona-ruce-model';
import { PersonaruceService } from '@app/pages/ruce/ref-ruce/Services/personaruce-service';
import { RefCargoModel } from '@app/pages/ruce/ref-ruce/Model/refcargo-model';
import { RefcargoService } from '@app/pages/ruce/ref-ruce/Services/refcargo-service';

@Component({
  selector: 'vex-autoridades-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class AutoridadFormListComponent implements OnInit {
  searchOptions!: SearchOptionsGeneric[];
  filtro: FilterOptions = { estaActivo: true };
  paginate:PaginateOptions;
  columnasVex: TableColumn<AutoridadOrganizacionRUCEModel>[];
  refPersonaRUCE: PersonaRUCEModel[]=[];
  refCargo: RefCargoModel[]=[];
  refAutoridadOrganizacionRUCE: AutoridadOrganizacionRUCEModel;

  constructor(
    public autoridadOrganizacionRUCEService: AutoridadOrganizacionRUCEService,
    public refPersonaRUCEService: PersonaruceService,
    public refCargoService: RefcargoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setColumns();
    this.autoridadOrganizacionRUCEService.filter(this.filtro,this.paginate).subscribe((res:any)=>{console.log(res)});
    this.setSearchOptions();
  }

  private setColumns(){
    this.columnasVex = [
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true },
/*       { label: 'APELLIDO', property: 'refPersonaRUCE.apellido', type: 'text', visible: true },
      { label: 'NOMBRE', property: 'refPersonaRUCE.nombre', type: 'text', visible: true },
      { label: 'DNI', property: 'refPersonaRUCE.documento', type: 'text', visible: true },
      { label: 'CUIL', property: 'refPersonaRUCE.cuil', type: 'text', visible: true },
      { label: 'TELEFONO', property: 'refPersonaRUCE.telefono', type: 'text', visible: true },
      { label: 'EMAIL', property: 'refPersonaRUCE.email', type: 'text', visible: true },
      { label: 'CARGO', property: 'refCargo.cargoDesc', type: 'text', visible: true }, */
      { label: 'INICIO', property: 'inicioCargo', type: 'date', visible: true },
      { label: 'FIN', property: 'finCargo', type: 'date', visible: true },
    ];
  }

  load() {
    const filtroAutoridadOrganizacionRUCE: FilterOptions = { estaActivo: true, SortProperties: 'nombre', PageSize: 1000 };
    this.refPersonaRUCEService.filter(filtroAutoridadOrganizacionRUCE).subscribe((resp: DataPage<PersonaRUCEModel>) => {
      this.refPersonaRUCE = resp.entities;
      this.setSearchOptions();
    });
  }

  private setSearchOptions() {
    this.searchOptions = [
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.NUMBER,
        name: 'documento',
        label: 'DNI',
        readonly: false,
        value: this.refPersonaRUCE,
        property: 'nombre'
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.NUMBER,
        name: 'nombre',
        label: 'Nombre',
        readonly: false,
        value: this.refPersonaRUCE,
        property: 'nombre'
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.NUMBER,
        name: 'apellido',
        label: 'Apellido',
        readonly: false,
        value: this.refPersonaRUCE,
        property: 'nombre'
      }),
    ]
  }

}
