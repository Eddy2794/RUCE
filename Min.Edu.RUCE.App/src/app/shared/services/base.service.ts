import { HttpClient } from '@angular/common/http';
import { BaseModel } from '@app/_models/base.model';
import { Observable } from 'rxjs';
import { DataPage, FilterOptions, JSONUtil, PaginateOptions } from '../utils';
import { Filter } from '../utils/filter';
import { IBaseService } from './interface/i-base.service';

export class BaseService<T extends BaseModel> implements IBaseService<T> {
    HTTP_GET = 'get';
    HTTP_POST = 'post';
    HTTP_PUT = 'put';
    HTTP_DELETE = 'delete';

    protected apiUrl: string;
    protected httpClient: HttpClient;
    protected endPoint: string;

    constructor(httpClient: HttpClient, apiUrl: string, endPoint: string) {
        this.httpClient = httpClient;
        this.apiUrl = apiUrl;
        this.endPoint = endPoint.toLowerCase();
    }
    findOne(id: number, filterOptions: FilterOptions = {}): Observable<T> {
        let enableFilter: boolean = filterOptions != null && !JSONUtil.isEmpty(filterOptions);
        let filter: string = enableFilter ? `filter=${JSONUtil.parseFromJson<FilterOptions>(filterOptions)}` : '';
        if (enableFilter) {
            filter = `?${filter}`;
        }
        let query = `${this.apiUrl}/${this.endPoint}/${id}`;
        return this.httpClient.get(query) as Observable<T>;
    }
    findOneFilter(id: number, filterOptions: FilterOptions = {}): Observable<T> {
        let enableFilter: boolean = filterOptions != null && !JSONUtil.isEmpty(filterOptions);
        let filter: string = enableFilter ? `filter=${JSONUtil.parseFromJson<FilterOptions>(filterOptions)}` : '';
        if (enableFilter) {
            filter = `?${filter}`;
        }
        let query = `${this.apiUrl}/${this.endPoint}/${id}/${filter}`;
        return this.httpClient.get(query) as Observable<T>;
    }

    find(filterOptions: FilterOptions = {}, paginateOptions: PaginateOptions = {}): Observable<DataPage<T> | T[]> {
        let enableFilter: boolean = filterOptions != null && !JSONUtil.isEmpty(filterOptions);
        let enablePaginate: boolean = paginateOptions != null && !JSONUtil.isEmpty(paginateOptions);

        let filter: string = enableFilter ? `filter=${JSONUtil.parseFromJson<FilterOptions>(filterOptions)}` : '';
        let paginate: string = enablePaginate ? `paginate=${JSONUtil.parseFromJson<PaginateOptions>(paginateOptions)}` : '';

        if (enableFilter && enablePaginate) {
            filter = `?${filter}`;
            paginate = `&${paginate}`;
        } else if (enableFilter && !enablePaginate) {
            filter = `?${filter}`;
        } else if (!enableFilter && enablePaginate) {
            paginate = `?${paginate}`;
        }

        let query = `${this.apiUrl}/${this.endPoint}/${filter}${paginate}`;
        return this.httpClient.get<T[]>(query) as Observable<DataPage<T> | T[]>;
    }
    filter(filterOptions: FilterOptions = {}, paginateOptions: PaginateOptions = {}): Observable<DataPage<T> | T[]> {

        let enableFilter: boolean = filterOptions != null && !JSONUtil.isEmpty(filterOptions);
        let enablePaginate: boolean = paginateOptions != null && !JSONUtil.isEmpty(paginateOptions);

        //console.log("FILTER OPTIONS:",filterOptions);
        let queryFilter = '';
        if (enableFilter) {
            // if (filterOptions.desc != '' && filterOptions.desc !== undefined) {
            //     queryFilter = queryFilter + `${this.endPoint}desc${filterOptions.descConstains}`
            // }

            if (filterOptions.descContains !== '' && filterOptions.descContains !== undefined) {
                let descConstains = encodeURIComponent(filterOptions.descContains ? filterOptions.descContains.toString() : '');
                queryFilter = queryFilter ? queryFilter + `&descContains=${descConstains}` : `descContains=${descConstains}`;
            }

            let jsonFilter = JSON.stringify({})
            Object.entries(filterOptions).forEach(([key, value], index) => {
                if (!key.includes('includesIds') && !key.includes('excludesIds') && !key.includes('estaActivo') && !(key === 'id') && !(key === 'descContains') && !(key === "modelo") && !(key === 'PageSize') && !(key === 'PageNumber')) {
                    if (value !== '' && value !== undefined) {
                        jsonFilter = JSON.stringify({
                          ...JSON.parse(jsonFilter),
                            [key]: value
                        })
                    }
                }
                //console.log(key, value, index);
            });
            if (jsonFilter!="{}")
                queryFilter = queryFilter ? queryFilter + `&filtros=${jsonFilter}` : `filtros=${jsonFilter}`;
            // if (filterOptions.filtros) {
            //     queryFilter = queryFilter ? queryFilter + `&filtros=${filterOptions.filtros}` : `filtros=${filterOptions.filtros}`;
            // }
            if (filterOptions.includeIds && filterOptions.includeIds.length !== 0) {
                filterOptions.includeIds.forEach(id => {
                    queryFilter = queryFilter ? queryFilter + `&IncludesIds=${id}` : `IncludesIds=${id}`;
                });
            }
            if (filterOptions.includeIds && filterOptions.includeIds.length !== 0) {
                filterOptions.includeIds.forEach(id => {
                    queryFilter = queryFilter ? queryFilter + `&ExcludesIds=${id}` : `ExcludesIds=${id}`;
                });
            }
            if (filterOptions.id !== 0 && filterOptions.id !== undefined) {
                queryFilter = queryFilter ? queryFilter + `&Id=${filterOptions.id}` : `Id=${filterOptions.id}`;
            }

            if (filterOptions.estaActivo && filterOptions.estaActivo === true) {
                queryFilter = queryFilter ? queryFilter + `&EstaActivo=${filterOptions.estaActivo}` : `EstaActivo=${filterOptions.estaActivo}`;
            }
            if (filterOptions.estaActivo === false) {
                queryFilter = queryFilter ? queryFilter + `&EstaActivo=${filterOptions.estaActivo}` : `EstaActivo=${filterOptions.estaActivo}`
            }


        }
        let filter: string = enableFilter ? queryFilter : '';
        let paginate: string = enablePaginate ? `PageNumber=${paginateOptions.pageNumber}&PageSize=${paginateOptions.pageSize}` : '';

        if (enableFilter && enablePaginate) {
            filter = `?${queryFilter}`;
            paginate = `&${paginate}`;
        } else if (enableFilter && !enablePaginate) {
            filter = `?${filter}`;
        } else if (!enableFilter && enablePaginate) {
            paginate = `?${paginate}`;
        }

        let query = `${this.apiUrl}/${this.endPoint}/Filter${filter}${paginate}`;
        console.log(query);

        return this.httpClient.get<T[]>(query) as Observable<DataPage<T> | T[]>;

    }
    create(model: T): Observable<T> {
        console.log(model);

        return this.httpClient.post<T>(`${this.apiUrl}/${this.endPoint}`, model) as Observable<T>;
    }

    update(id: number, model: T): Observable<T> {
        return this.httpClient.put<T>(`${this.apiUrl}/${this.endPoint}/${id}`, model) as Observable<T>;
    }

    delete(id: number): Observable<T> {
        return this.httpClient.delete<T>(`${this.apiUrl}/${this.endPoint}/${id}`) as Observable<T>;
    }

    upload(propertyName: string, idEntity: number, file: FormData) {
        return this.httpClient.put<T[]>(`${this.apiUrl}/${'upload/image'}/${this.endPoint}/${propertyName}/${idEntity}`, file) as Observable<T[]>;
    }
}
