import { EstablecimientoService } from '../../Services/Establecimiento/establecimiento-service.service';
import { EstablecimientoModel } from '../../Models/Establecimiento/establecimiento-model';
import { Component, OnInit } from '@angular/core';

import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

// import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-establecimiento',
  templateUrl: './establecimiento.component.html',
  styleUrls: ['./establecimiento.component.scss']
})
export class EstablecimientoComponent implements OnInit {
  establecimientos!: Array<EstablecimientoModel>;
  establecimiento!: EstablecimientoModel;

  editar = faPenToSquare;
  eliminar = faTrash;

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
    // this.ngxFavicon.setFavicon(favicon_url);
  }

}
