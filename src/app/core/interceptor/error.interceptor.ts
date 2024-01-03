import { AuthService } from '../service/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let errorMessage = 'Unknown error occured';
        if (err.error instanceof ErrorEvent) {
          //Client side error
          console.log('Client side error');
          errorMessage = err.error.message;
        } else {
          //Server side errors
          console.log('Server side error - ' + err.status);
          if (err.status !== 0) {
            errorMessage = err.error.message;
            console.log(
              'Server side error - STATUS !==0: ' +
                err.error.message +
                ' | StatusCode: ' +
                err.error.statusCode
            );
            this.authenticationService.logout();
            location.reload();
            this.router.navigate(['/authentication/signin']);
          }
        }
        return throwError(() => new Error(errorMessage));

        //   console.log('ErrorInterceptor ==> ' + err.message);
        //   if (err instanceof HttpErrorResponse) {
        //     if (err.status === 401) {
        //       // auto logout if 401 response returned from api
        //       this.authenticationService.logout();
        //       location.reload();
        //       this.router.navigate(['/authentication/signin']);
        //     }
        //   }

        //   const error = err.error.message || err.statusText;
        //   return throwError(() => new Error(error));
      })
    );
  }
}
