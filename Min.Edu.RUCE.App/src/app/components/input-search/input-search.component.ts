import { Component, OnInit } from '@angular/core';
import { SearchService } from '@app/shared/services/search.service';
import { FilterOptions } from '@app/shared/utils';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {
  
  filtro: FilterOptions = { estaActivo: true };
  constructor(  public searchService: SearchService) { }

  ngOnInit(): void {
  }
  botonClic(texto: string) {
    this.filtro.descContains = texto;
    this.searchService.setSearch = this.filtro;
  }

}
