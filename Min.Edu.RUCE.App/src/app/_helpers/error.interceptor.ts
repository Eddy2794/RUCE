import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
      private authenticationService: AuthenticationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
            const error = err.error.message || err.statusText;
            if(!([201,200].indexOf(err.status)!==-1)){
              if([401].indexOf(err.status)!==-1){
                location.reload();
                this.authenticationService.logout();
              } else{
                if(error === 'Unknown Error') {
                  alert('Se produjo un error de conexion');//err.error.message
                }
              }
              return throwError(err.error);
            }
            return throwError(err);
        }));
    }
}
