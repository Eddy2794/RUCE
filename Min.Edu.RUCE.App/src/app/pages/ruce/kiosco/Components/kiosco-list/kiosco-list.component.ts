import { Component, Input, OnInit } from '@angular/core';
import { FilterOptions } from '@app/shared/utils';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { KioscoModel } from '../../Models/kiosco-model';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { FormGroup } from '@angular/forms';
import { CooperadoraService } from '../../../cooperadora/Services/cooperadora.service';
import { KioscoService } from '../../Services/kiosco.service';

@Component({
  selector: 'vex-kiosco-list',
  templateUrl: './kiosco-list.component.html',
  styleUrls: ['./kiosco-list.component.scss']
})
export class KioscoListComponent implements OnInit {

  columnasBusqueda!: TableColumn<KioscoModel>[];
  filtroBusqueda: FilterOptions = { PageSize: 10 };
  searchOptionsBusqueda!: SearchOptionsGeneric[];
  frmKiosco!: FormGroup;

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<KioscoModel>[];

  kiosco: KioscoModel[] = [];

  @Input() idCooperadora!: number;

  constructor(
    public cooperadoraService: CooperadoraService,
    public kioscoService: KioscoService,
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
      { label: 'ACCESO POR LICITACION', property: 'accesoLicitacion', type: 'boolean', visible: true },
      { label: 'DOCUMENTACION PRESENTADA', property: 'documentacionPresentada', type: 'boolean', visible: true },
      { label: 'INICIO DE PERIODO', property: 'periodoInicio', type: 'date', visible: true },
      { label: 'FIN DE PERIODO', property: 'periodoFin', type: 'date', visible: true },
    ]
  }

}
