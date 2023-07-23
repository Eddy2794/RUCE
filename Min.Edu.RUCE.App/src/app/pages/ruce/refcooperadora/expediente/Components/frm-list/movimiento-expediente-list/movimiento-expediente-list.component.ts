import { ExpedienteService } from './../../../Services/expediente.service';
import { MovimientoExpedienteService } from './../../../Services/movimiento-expediente.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoridadComisionModel } from '@app/pages/ruce/refcooperadora/comision/Models/autoridad-comision-model';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { MovimientoExpedienteModel } from '../../../Models/movimiento-expediente-model';
import { ExpedienteModel } from '../../../Models/expediente-model';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'vex-movimiento-expediente-list',
  templateUrl: './movimiento-expediente-list.component.html',
  styleUrls: ['./movimiento-expediente-list.component.scss']
})
export class MovimientoExpedienteListComponent implements OnInit {
  @Input() idCooperadora!: number;


  protected idExpediente!: number;
  movimientosExpediente: Array<MovimientoExpedienteModel> = [];


  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: ""};
  columnasVex: TableColumn<AutoridadComisionModel>[];

  constructor(private route:ActivatedRoute,
              protected movimientoExpedienteService: MovimientoExpedienteService,
              private expedienteService: ExpedienteService,
              private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obtenerExpediente(this.idCooperadora);
  }

  obtenerExpediente(id: number): void {
    this.expedienteService.findOne(id).subscribe(
      (res:ExpedienteModel)=>{
        this.idExpediente=res?.id;
        this.obtenerBusqueda(this.idExpediente)
      },(error)=>{
        // this.mostrarDialogMsj("Conflicto","No posee un expediente",false)
      }
    );
  }

  mostrarDialogMsj(titulo: string, msj: string, cancelVisible: boolean) {
    let datos: DialogData = { titulo, msj, cancelVisible }
    this.matDialog.open(DialogComponent, {
      width: '200px',
      data: datos
    });
  }

  obtenerBusqueda(id:number) {
    this.filtro = { estaActivo: true, PageSize: 10, filtros:'{"fkExpediente":"'+id+'"}'};
    this.cargarList();
  }

  cargarList() {
    this.setColumns();
  }

  private setColumns() {
    this.columnasVex = [
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true },
      { label: 'NRO EXPEDIENTE', property: 'nroExpediente', type: 'text', visible: true },
      { label: 'INSTANCIA INSTRUMENTO', property: 'fkInstanciaInstrumento.instrumentoDesc', type: 'object', visible: true },
      { label: 'OBSERVACIONES', property: 'cantObservaciones', type: 'text', visible: true },
      { label: 'OBSERVACIUONES RESPODNDIDAS', property: 'observacionesRespondidas', type: 'text', visible: true },
    ]
  }
}
