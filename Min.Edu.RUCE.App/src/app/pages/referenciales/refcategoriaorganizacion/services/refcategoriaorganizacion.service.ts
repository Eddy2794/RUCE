import { HttpClient } from '@angular/common/http';
import { BaseService } from '@app/shared/services';
import { Injectable } from '@angular/core';
import { RefCategoriaOrganizacionModel } from '../model/refcategoriaorganizacion.model';
import { environment } from '@environments/environment';
import { DataPage, FilterOptions, PaginateOptions } from '@app/shared/utils';
import { Observable, of } from 'rxjs';
import { Page } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class RefcategoriaorganizacionService extends BaseService<RefCategoriaOrganizacionModel> {

  constructor(http: HttpClient) {
    super(http,environment.apiConfigUrl,RefCategoriaOrganizacionModel.className);
  }

  /* //Eliminar este metodo para usar el filter desde el back:
  override filter(filterOptions: FilterOptions = {}, paginateOptions: PaginateOptions = {}): Observable<DataPage<RefCategoriaOrganizacionModel> | RefCategoriaOrganizacionModel[]>{
        
    let respuesta: Page = {
      entities: [
        { id: 1, categoriaOrganizacionDesc: 'MI CAT1' },
        { id: 2, categoriaOrganizacionDesc: 'MI CAT2' },
        { id: 3, categoriaOrganizacionDesc: 'PRIMERA' },
        { id: 4, categoriaOrganizacionDesc: 'SEGUNDA' },
        { id: 5, categoriaOrganizacionDesc: 'VACIO' },
      ],
      succeeded: true,
      errors: [],
      paged: {
        entityCount: 5,
        pageSize: 1,
        pageNumber: 1
      }
    }
    console.log(respuesta);
    return of(respuesta);
  }
 */
}
