import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models/user.model';
import { UserService } from '@app/_services/user.service';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';

@Component({
  selector: 'vex-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

  searchOptions!: SearchOptionsGeneric[];
  filtros!: {};
  filtro: FilterOptions = { estaActivo: true, filtros: null};
  columnasVex: TableColumn<User>[];

  constructor(
    public usuarioService: UserService,
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
  }

  private setColumns() {
    this.columnasVex = [
      { label: 'ACCIONES', property: 'actions', type: 'button', visible: true },
      { label: 'CODIGO', property: 'id', type: 'object', visible: true },
      { label: 'NOMBRE DE USUARIO', property: 'username', type: 'text', visible: true },
      { label: 'ROL', property: 'roles.0.name', type: 'object', visible: true },
      { label: 'NOMBRE', property: 'persona_r_u_c_e.nombre', type: 'object', visible: true },
      { label: 'APELLIDO', property: 'persona_r_u_c_e.apellido', type: 'object', visible: true },
      { label: 'CUIL', property: 'persona_r_u_c_e.cuil', type: 'object', visible: true },
      { label: 'EMAIL', property: 'persona_r_u_c_e.email', type: 'object', visible: true },
      { label: 'TELEFONO', property: 'persona_r_u_c_e.telefono', type: 'object', visible: true },
    ]
  }

}
