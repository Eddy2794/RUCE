import { Component, OnInit, Input } from '@angular/core';
import { MatriculaService } from '../../../Services/matricula-service';
import { MatDialog } from '@angular/material/dialog';
import { MatriculaModel } from '../../../Models/matricula-model';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { DataPage, FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';
import { OrganizacionRUCEService } from '@app/pages/ruce/organizacionruce/Services/organizacionruce-service.service';

@Component({
  selector: 'vex-matricula-list',
  templateUrl: './matricula-list.component.html',
  styleUrls: ['./matricula-list.component.scss']
})
export class MatriculaListComponent implements OnInit {

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<MatriculaModel>[];

  matricula: MatriculaModel[] = [];

  @Input() idOrganizacion!: number;

  constructor(
    public organizacionRUCEService: OrganizacionRUCEService,
    public matriculaService: MatriculaService,
    public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.obtenerBusqueda()
  }

  obtenerBusqueda() {
    this.filtro = { estaActivo: true, PageSize: 10};
    // this.filtro = { estaActivo: true, PageSize: 10, filtros:'{"fkOrganizacionRUCE":"'+this.idOrganizacion+'"}'};
    this.cargarList();
  }

  cargarList() {
    this.setColumns();
    this.loadMatriculas();
  }

  private setColumns() {
    this.columnasVex = [
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true },
      { label: 'PERIODO LECTIVO', property: 'periodoLectivo', type: 'text', visible: true },
      { label: 'MATRICULA', property: 'matricula', type: 'text', visible: true },
      
    ]
  }

  private setSearchOptions() {
    this.searchOptions = [
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.NUMBER,
        name: 'id',
        label: 'Codigo',
        readonly: false,
      }),
    ]
  }

  loadMatriculas() {
    this.matriculaService.filter(this.filtro).subscribe((resp: DataPage<MatriculaModel>) => {
      this.matricula = Object.assign({},resp.entities,this.matricula) || [];
      this.setSearchOptions();
    });
  }

}
