import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';
//import * as jwt_decode from 'jwt-decode';
import { User } from '@app/_models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject!: BehaviorSubject<User>;
    public currentUser!: Observable<User>;
    public user!: User;
    constructor(private http: HttpClient, public router: Router) {
        let dataUserCurrent = localStorage.getItem('currentUser')
        // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(dataUserCurrent));
        // this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | undefined {
       return undefined;
    }

    login(username: string, password: string, remember_me: boolean) {
        return this.http.post<any>(`${environment.apiRuceUrl}/auth/login`, { username, password, remember_me })
            .pipe(
              map(response => {
                if (response.succeeded){
                  localStorage.setItem('currentUser', JSON.stringify(response.data));
                  return response.data;
                }else
                return response;
            }),
            );
    }

    logout() {
      this.http.post<any>(`${environment.apiRuceUrl}/auth/logout`,{});
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('Products');
        localStorage.setItem('ROLE', '');
        this.currentUserSubject.next({});
        this.user = { };
    }
    getDecodedAccessToken(token: string): any {
        try {
            // return  jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }
    expired( dateExp: number) {
        const timenow = new Date().getDate() / 1000;
        const ahora = new Date();
        ahora.setTime(ahora.getTime() + (4 * 60 * 1000) ); // si faltan 4 horas renueva token podrias probar con 1
        // console.log(tokenExp.getTime(), 'date token');
        if ( dateExp < timenow) {
          return true;
        } else {
          localStorage.removeItem('currentUser');
          return false;
        }
    }
    checkToken(exp: number ): Promise<boolean> {
      return new Promise((resolve, reject) => {
          const tokenExp = new Date(exp * 1000); // esta en segundo debe estar en milesegundos
          const ahora = new Date();
          ahora.setTime(ahora.getTime() + (4 * 60 * 1000) ); // si faltan 4 horas renueva token podrias probar con 1
          if (tokenExp.getTime() > ahora.getTime()) {
            resolve(false);
          }
          resolve(true);
        });
      }
}
