import { Component, OnInit } from '@angular/core';
import { CooperadoraService } from '@app/pages/ruce/cooperadora/Services/cooperadora.service';
import { FilterOptions } from '@app/shared/utils';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { defaultChartOptions } from 'src/@vex/utils/default-chart-options';

@Component({
  selector: 'vex-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  filtro: FilterOptions = { estaActivo: true };
  tableData = [];
  totalCooperadoras?: number = 0;
  constructor(
    private cooperadoraService: CooperadoraService
  ){}
  ngOnInit(): void {
      this.cooperadoraService.filter(this.filtro).subscribe((res: any) => {
        this.totalCooperadoras = res.paged.entityCount;
        const datos = res.entities.map(coop => {
          const dato: any = {};
    
          switch (coop.estado) {
            case 'rojo':
              dato['status'] = 'warn';
              break;
            case 'amarillo':
              dato['status'] = 'pending';
              break;
            case 'verde':
              dato['status'] = 'ready';
              break;
          }
    
          dato['nombre'] = coop.denominacion;
          dato['legajo'] = coop.legajo;
          const fecha = new Date(coop.updated_at);
          dato['modificado'] = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`;
          return dato;
        });
    
        this.tableData = datos;
      });
  }

  tableColumns: TableColumn<1>[] = [
    {
      label: 'ESTADO',
      property: 'status',
      type: 'badge'
    },
    {
      label: 'DENOMINACION',
      property: 'nombre',
      type: 'text'
    },
    {
      label: 'LEGAJO',
      property: 'legajo',
      type: 'text',
      cssClasses: ['font-medium']
    },
    {
      label: 'FECHA',
      property: 'modificado',
      type: 'text',
      cssClasses: ['text-secondary']
    }
  ];

  series: ApexAxisChartSeries = [{
    name: 'Subscribers',
    data: [28, 40, 36, 0, 52, 38, 60, 55, 67, 33, 89, 44]
  }];

  userSessionsSeries: ApexAxisChartSeries = [
    {
      name: 'Users',
      data: [10, 50, 26, 50, 38, 60, 50, 25, 61, 80, 40, 60]
    },
    {
      name: 'Sessions',
      data: [5, 21, 42, 70, 41, 20, 35, 50, 10, 15, 30, 50]
    },
  ];

  salesSeries: ApexAxisChartSeries = [{
    name: 'Sales',
    data: [28, 40, 36, 0, 52, 38, 60, 55, 99, 54, 38, 87]
  }];

  pageViewsSeries: ApexAxisChartSeries = [{
    name: 'Page Views',
    data: [405, 800, 200, 600, 105, 788, 600, 204]
  }];

  uniqueUsersSeries: ApexAxisChartSeries = [{
    name: 'Unique Users',
    data: [356, 806, 600, 754, 432, 854, 555, 1004]
  }];

  uniqueUsersOptions = defaultChartOptions({
    chart: {
      type: 'area',
      height: 100
    },
    colors: ['#ff9800']
  });

}
