import { Component, OnInit } from '@angular/core';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { UsuarioModel } from '../../Model/usuario-model';
import { UsuarioService } from '../../Service/usuario.service';

@Component({
  selector: 'vex-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<UsuarioModel>[];

  constructor(
    public usuarioService: UsuarioService,
  ) {

  }

  ngOnInit(): void {
    this.obtenerBusqueda()
  }

  obtenerBusqueda() {
    this.filtro = { estaActivo: true, PageSize: 10};
    this.cargarList();
  }

  cargarList() {
    this.setColumns();
    //this.loadAutoridades();
  }

  private setColumns() {
    this.columnasVex = [
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true },
      { label: 'CODIGO', property: 'id', type: 'object', visible: true },
      { label: 'NOMBRE DE USUARIO', property: 'username', type: 'text', visible: true },
      { label: 'TIPO DE USUARIO', property: 'tipoFondoDesc', type: 'text', visible: true },
      //{ label: 'ULTIMO INICIO DE SESION', property: 'tipoFondoDesc', type: 'text', visible: true },
      { label: 'CUIL', property: 'persona_r_u_c_e.0.cuil', type: 'object', visible: true },
      { label: 'DNI', property: 'persona_r_u_c_e.0.documento', type: 'object', visible: true },
      { label: 'NOMBRE', property: 'persona_r_u_c_e.0.nombre', type: 'object', visible: true },
      { label: 'APELLIDO', property: 'persona_r_u_c_e.0.apellido', type: 'object', visible: true },
      { label: 'EMAIL', property: 'persona_r_u_c_e.0.email', type: 'object', visible: true },
      { label: 'TELEFONO', property: 'persona_r_u_c_e.0.telefono', type: 'object', visible: true },
    ]
  }

}
