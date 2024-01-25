import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {
  delay,
  concatMap,
  catchError,
  retryWhen,
  finalize,
} from 'rxjs/operators';
import { ErrorCodes } from 'src/app/enums/enums-handler';
import { AuthService } from '../../authentication/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (localStorage.getItem('currentUser')) {
    //   const jsonValues = JSON.parse(localStorage.getItem('currentUser')!);
    //   console.log(
    //     'AuthInterceptor - JWT token from local storage :' + jsonValues.token
    //   );
    //   if (jsonValues) {
    //     req = req.clone({
    //       setHeaders: { Authorization: `Bearer ${jsonValues.token}` },
    //     });
    //   }
    // } else {
    //   console.log('AuthInterceptor ==> No Token');
    //   let ITokenValue!: ITokenData;
    //   this.authenticationService.currentUserSubject.next(ITokenValue);
    // }

    return next.handle(req).pipe(
      finalize(() => console.log('FINISHED LOADING')),
      retryWhen(
        (error) => this.retryRequest(error, 2)
        // error.pipe(
        //   concatMap((checkErr: HttpErrorResponse, count: number) => {
        //     if (checkErr.status === 0 && count <= 5) {
        //       return of(checkErr);
        //     }
        //     return throwError(() => checkErr);
        //   }),
        //   delay(3000)
        // )
      )
      // ,catchError((error: HttpErrorResponse) => {
      //   const errorMessage = this.setError(error);
      //   //this.authenticationService.currentUserValue;
      //   console.log(errorMessage);
      //   //this.alertifyService.error(errorMessage);
      //   return throwError(() => new Error(errorMessage));
      // })
    );
  }

  retryRequest(
    error: Observable<any | unknown>,
    retryCount: number
  ): Observable<any | unknown> {
    console.log('TOTAL RETRY ==> ' + (retryCount + 1));
    return error.pipe(
      concatMap((checkErr: HttpErrorResponse, count: number) => {
        //Retry in case WebApi is down
        if (count <= retryCount) {
          console.log('RETRY COUNT ==> ' + count);
          switch (checkErr.status) {
            case ErrorCodes.serverDown:
              return of(checkErr);

            // case ErrorCodes.unauthorized:
            //   return of(checkErr);
          }
          // if (checkErr.status === ErrorCodes.serverDown) {
          //   return of(checkErr);
          // } else if (checkErr.status === ErrorCodes.unauthorized) {
          //   return of(checkErr);
          // }
        }
        return throwError(() => checkErr);
      }),
      delay(3000)
    );
  }

  // setError(error: HttpErrorResponse): string {
  //   let errorMessage = 'Unknown error occured';
  //   if (error.error instanceof ErrorEvent) {
  //     //Client side error
  //     console.log('Client side error');
  //     errorMessage = error.error.message;
  //   } else {
  //     //Server side errorS
  //     console.log('Server side error - ' + error.status);
  //     if (error.status !== 0) {
  //       errorMessage = error.error.message;
  //       console.log(
  //         'Server side error - STATUS !==0: ' +
  //           error.error.message +
  //           ' | StatusCode: ' +
  //           error.error.statusCode
  //       );
  //     }
  //   }
  //   return errorMessage;
  // }
}
