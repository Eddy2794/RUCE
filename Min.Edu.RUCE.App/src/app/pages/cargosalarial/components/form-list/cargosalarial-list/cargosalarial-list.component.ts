import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataPage, FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { CargoSalarialModel } from '../../../model/cargosalarial.model';
import { CargosalarialService } from '../../../services/cargosalarial.service';
import { RefJornadaModel } from '../../../../referenciales/refjornada/model/refjornada.model';
import { RefjornadaService } from '../../../../referenciales/refjornada/services/refjornada.service';

@Component({
  selector: 'vex-cargosalarial-list',
  templateUrl: './cargosalarial-list.component.html',
  styleUrls: ['./cargosalarial-list.component.scss']
})
export class CargosalarialListComponent implements OnInit {
  searchOptions!: SearchOptionsGeneric[];
  filtro: FilterOptions = { estaActivo: true };
  refJornada: RefJornadaModel[]=[];
  columnasVex: TableColumn<CargoSalarialModel>[];
  constructor(
    public cargosalarialService: CargosalarialService,
    public refjornadaService: RefjornadaService,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.setColumns();
    this.loadJornada();
  }

  private setColumns() {
    this.columnasVex = [
      { label: 'CÓDIGO', property: 'id', type: 'text', visible: true },
      { label: 'CARGO SALARIAL', property: 'cargoSalarialDesc', type: 'text', visible: true },
      { label: 'JORNADA', property: 'refJornada.jornadaDesc', type: 'object', visible: true },
      { label: 'EQUIVALENCIA HORARIA', property: 'equivalenciaHoraria', type: 'text', visible: true },
      { label: 'ORDEN VISUAL', property: 'ordenVisual', type: 'text', visible: true },
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true }
    ]
  }

  loadJornada() {
    const filtroJornada: FilterOptions = { estaActivo: true, SortProperties: 'jornadaDesc', PageSize: 1000};
    this.refjornadaService.filter(filtroJornada).subscribe((resp: DataPage<RefJornadaModel>) => {
      this.refJornada = resp.entities || [];
      this.setSearchOptions();
    });
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
        name: 'cargoSalarialDescContains',
        label: 'Cargo Salarial',
        readonly: false
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.SELECT,
        typeData: TypeData.TEXT,
        name: 'idRefJornada',
        label: 'Jornada',
        readonly: false,
        value: this.refJornada,
        property: 'jornadaDesc'
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: 'equivalenciaHoraria',
        label: 'Equivalencia horaria',
        readonly: false
      }),
    ]
  }


}
