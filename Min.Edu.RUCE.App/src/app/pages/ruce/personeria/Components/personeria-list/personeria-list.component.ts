import { Component, Input, OnInit } from '@angular/core';
import { PersoneriaModel } from '../../Models/personeria-model';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { FormGroup } from '@angular/forms';
import { CooperadoraService } from '../../../cooperadora/Services/cooperadora.service';
import { PersoneriaService } from '../../Services/personeria.service';

@Component({
  selector: 'vex-personeria-list',
  templateUrl: './personeria-list.component.html',
  styleUrls: ['./personeria-list.component.scss']
})
export class PersoneriaListComponent implements OnInit {

  columnasBusqueda!: TableColumn<PersoneriaModel>[];
  filtroBusqueda: FilterOptions = { PageSize: 10 };
  searchOptionsBusqueda!: SearchOptionsGeneric[];
  frmPersonaeria!: FormGroup;

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<PersoneriaModel>[];

  personeria: PersoneriaModel[] = [];

  @Input() idCooperadora!: number;
  // @Input() view!: string;

  constructor(
    public cooperadoraService: CooperadoraService,
    public personeriaService: PersoneriaService,
  ) { }

  ngOnInit(): void {
    this.obtenerBusqueda()
  }

  obtenerBusqueda() {
    this.filtro = { estaActivo: true, PageSize: 10, filtros:'{"fkCooperadora":"'+this.idCooperadora+'"}'};
    this.cargarList();
  }

  cargarList() {
    this.setColumns();
    //this.loadAutoridades();
  }

  private setColumns() {
    this.columnasVex = [
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true },
    ]
  }

}
