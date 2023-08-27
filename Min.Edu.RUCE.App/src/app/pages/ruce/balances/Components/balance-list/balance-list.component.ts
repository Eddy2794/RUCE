import { Component, Input, OnInit } from '@angular/core';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { BalanceModel } from '../../Model/balance-model';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { FormGroup } from '@angular/forms';
import { BalanceService } from '../../Service/balance.service';
import { CooperadoraService } from '@app/pages/ruce/cooperadora/Services/cooperadora.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vex-balance-list',
  templateUrl: './balance-list.component.html',
  styleUrls: ['./balance-list.component.scss']
})
export class BalanceListComponent implements OnInit {

  columnasBusqueda!: TableColumn<BalanceModel>[];
  filtroBusqueda: FilterOptions = { PageSize: 10 };
  searchOptionsBusqueda!: SearchOptionsGeneric[];
  frmAtencionSeguimiento!: FormGroup;

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<BalanceModel>[];

  balance: BalanceModel[] = [];

  @Input() idCooperadora!: number;

  constructor(
    public cooperadoraService: CooperadoraService,
    public balanceService: BalanceService,
    private route:ActivatedRoute,
  ) {
    this.idCooperadora = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.obtenerBusqueda()
  }

  obtenerBusqueda() {
    this.filtro = { estaActivo: true, PageSize: 10, fkCooperadora:this.idCooperadora};
    this.cargarList();
  }

  cargarList() {
    this.setColumns();
  }

  private setColumns() {
    this.columnasVex = [
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true },
      { label: 'AÑO DE RENDICIÓN', property: 'anio', type: 'text', visible: true },
      { label: 'BALANCE RENDIDO', property: 'estadoBalance', type: 'boolean', visible: true },
    ]
  }

}
