import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vex-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  comision?: RefTipoComisionService;
  id?: number;

  constructor(
    private route:ActivatedRoute, 
    private RefTipoComisionService:RefTipoComisionService
  ) {
    this.cooperadora={}
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.obtenerData(this.id)
  }

  private obtenerData(id:any){
    this.cooperadoraService.findOne(id).subscribe((res:any) => {
      this.cooperadora = Object.assign({}, this.cooperadora, res.entities);
    });
  }

}
