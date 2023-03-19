import { EstablecimientoService } from '../../Services/Establecimiento/establecimiento-service.service';
import { EstablecimientoModel } from '../../Models/Establecimiento/establecimiento-model';
import { Component, OnInit } from '@angular/core';

// import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';
import { ColumnOptions, FilterOptions } from '@app/shared/utils';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';

// import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-establecimiento',
  templateUrl: './establecimiento.component.html',
  styleUrls: ['./establecimiento.component.scss']
})
export class EstablecimientoComponent implements OnInit {
  establecimientos!: Array<EstablecimientoModel>;
  establecimiento!: EstablecimientoModel;

  searchOptions!: SearchOptionsGeneric[];
  filtro: FilterOptions = { estaActivo: true };
  refEstablecimiento: EstablecimientoModel[] = [];
  columnasVex: TableColumn<EstablecimientoModel>[];

  // editar = faPenToSquare;
  // eliminar = faTrash;

  // constructor(private ngxFavicon: AngularFaviconService) {}
  constructor(private establecimientoService: EstablecimientoService, private router: Router){
    this.obtenerEstablecimientos();
  }

  private obtenerEstablecimientos(){
    this.establecimientos = new Array<EstablecimientoModel>();
    this.establecimiento = new EstablecimientoModel();
    this.establecimientoService.all().subscribe((res: Array<EstablecimientoModel>) => {
      Object.assign(this.establecimientos, res)
    });
  }

  protected elimiarEstablecimiento(id:number){
    this.establecimientoService.delete(id).subscribe((res)=>{
      console.log(res)
    });
    
    //recarga la pagina actual
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/establecimientos']);
  }

  ngOnInit(): void {
    
  }

  private setColumns() {
      this.columnasVex = [
        { label: 'CÓDIGO', property: 'id', type: 'text', visible: true },

        { label: 'CUE', property: 'cue', type: 'text', visible: true },
        { label: 'REGION', property: 'region', type: 'text', visible: true },
        { label: 'NIVEL', property: 'nivel', type: 'text', visible: true },
        { label: 'LOCALIDAD', property: 'localidad', type: 'text', visible: true },
        { label: 'DEPARTAMENTO', property: 'departamento', type: 'text', visible: true },
        { label: 'EMAIL', property: 'email', type: 'text', visible: true },
        { label: 'DOMICILIO', property: 'domicilio', type: 'text', visible: true },
        { label: 'TELEFONO', property: 'telefono', type: 'text', visible: true },
        { label: 'MATRICULA', property: 'matricula', type: 'text', visible: true },
        
        { label: 'ACCIONES', property: 'actions', type: 'button', visible: true }
      ]
  }

  private setSearchOptions() {
    this.searchOptions = [
      new SearchOptionsGeneric({ 
        typeControl: TypeControl.INPUT, 
        typeData: TypeData.NUMBER, 
        name: 'cue',  
        label: 'CUE', 
        readonly: false
      }),
      new SearchOptionsGeneric({ 
        typeControl: TypeControl.INPUT, 
        typeData: TypeData.NUMBER, 
        name: 'region',  
        label: 'Region', 
        readonly: false
      }),
      new SearchOptionsGeneric({ 
        typeControl: TypeControl.INPUT, 
        typeData: TypeData.NUMBER, 
        name: 'nivel',  
        label: 'Nivel', 
        readonly: false
      }),
    ]
  }
}
