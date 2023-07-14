import { Component, OnInit } from '@angular/core';
import { DataPage, FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { PlanEstudioBaseModel } from '../../model/planestudiobase.model';
import { PlanestudiobaseService } from '../../service/planestudiobase.service';

@Component({
  selector: 'vex-planestudiobase-list',
  templateUrl: './planestudiobase-list.component.html',
  styleUrls: ['./planestudiobase-list.component.scss']
})
export class PlanestudiobaseListComponent implements OnInit {

  columnasVex: TableColumn<PlanEstudioBaseModel>[];
  filtro: FilterOptions = { estaActivo: true };
  searchOptions!: SearchOptionsGeneric[];

  constructor(public planEstudioBaseService: PlanestudiobaseService,
    ) { }

  ngOnInit(): void {
    this.setColumns();
  }

  private setColumns() {
    this.columnasVex = [
      { label: 'CÓDIGO', property: 'id', type: 'text', visible: true },
      { label: 'PLAN DE ESTUDIO', property: 'planEstudioDesc', type: 'text', visible: true },
      { label: 'ESPECIALIDAD', property: 'refEspecialidad.especialidadDesc', type: 'object', visible: true },
      { label: 'NIVEL EDUCATIVO', property: 'refNivelEducativo.nivelEducativoDesc', type: 'object', visible: true },
      { label: 'CONFIRMADO', property: 'estaConfirmado', type: 'boolean', visible: true },
      /* { label: 'ACCIONES', property: 'actions', type: 'button', visible: true } */
    ]
  }

  private setSearchOptions() {
    this.searchOptions = [
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.NUMBER,
        name: 'id',
        label: 'Código',
        readonly: false
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: 'PlanEstudioDescContains',
        label: 'Plan de Estudio',
        readonly: false
      }),
    ]
  }
}
