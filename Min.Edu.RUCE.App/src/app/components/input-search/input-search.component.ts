import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '@app/shared/services/search.service';
import { FilterOptions } from '@app/shared/utils';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {
  @ViewChild("textoBusqueda") textoBusqueda!: ElementRef;
  @Input() bandera!: boolean;
  @Input() filter: FilterOptions;
  filtro: FilterOptions = { estaActivo: true };
  
  constructor(  public searchService: SearchService) { }

  ngOnInit(): void {
    Object.assign(this.filtro, this.filter)
  }
  botonClic(texto: string) {
    this.filtro.descContains = texto;
    this.searchService.setSearch = this.filtro;
    this.textoBusqueda.nativeElement.value = '';
  }

}
