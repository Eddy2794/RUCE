import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FilterOptions } from "../utils";

@Injectable({
    providedIn: 'root'
})
export class SearchService{
    searchOption!: FilterOptions[];
    private searchOptionsValue: BehaviorSubject<FilterOptions[]> = new BehaviorSubject<FilterOptions[]>(this.searchOption);

    constructor() { }

    get obsSearch(){
        return this.searchOptionsValue.asObservable();
    }

    set setSearch(valor:any){
        this.searchOptionsValue.next(valor);
    }
    

}