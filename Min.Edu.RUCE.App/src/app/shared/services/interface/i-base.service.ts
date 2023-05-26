import { DataPage, FilterOptions, PaginateOptions } from '@app/shared/utils';
import { Observable } from 'rxjs';


export interface IBaseService<T> {
    findOne(id: number): Observable<T>;
    findOneFilter(id: number, filterOptions: FilterOptions): Observable<T>;
    find(filterOptions: FilterOptions, paginateOptions: PaginateOptions): Observable<DataPage<T> | T[]>;
    filter(filterOptions: FilterOptions, paginateOptions: PaginateOptions): Observable<DataPage<T> | T[]>;
    create(model: T): Observable<T>;
    update(id:number, model: T): Observable<T>;
    delete(id: number): Observable<T>;
}