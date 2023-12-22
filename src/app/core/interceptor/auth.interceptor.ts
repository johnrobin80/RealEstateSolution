import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {
  delay,
  mergeMap,
  materialize,
  dematerialize,
  concatMap,
  catchError,
  retryWhen,
} from 'rxjs/operators';
import { User } from '../models/user';
import { ErrorCodes } from 'src/app/enums/enums-handler';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('currentUser')) {
      const jsonValues = JSON.parse(localStorage.getItem('currentUser')!);
      console.log(
        'AuthInterceptor - JWT token from local storage :' + jsonValues.token
      );
      if (jsonValues) {
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${jsonValues.token}` },
        });
      }
    }
    console.log('AuthInterceptor - Error');
    return next.handle(req).pipe(
      retryWhen(
        (error) => this.retryRequest(error, 5)

        // error.pipe(
        //   concatMap((checkErr: HttpErrorResponse, count: number) => {
        //     if (checkErr.status === 0 && count <= 5) {
        //       return of(checkErr);
        //     }
        //     return throwError(() => checkErr);
        //   }),
        //   delay(3000)
        // )
      ),

      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.setError(error);
        console.log(errorMessage);
        //this.alertifyService.error(errorMessage);
        return throwError(() => errorMessage);
      })
    );
  }

  retryRequest(
    error: Observable<any | unknown>,
    retryCount: number
  ): Observable<any | unknown> {
    console.log('RETRY ==> ' + retryCount);
    return error.pipe(
      concatMap((checkErr: HttpErrorResponse, count: number) => {
        //Retry in case WebApi is down
        if (count <= retryCount) {
          console.log('RETRY ==> ' + retryCount);
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

  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown error occured';
    if (error.error instanceof ErrorEvent) {
      //Client side error
      console.log('Client side error');
      errorMessage = error.error.message;
    } else {
      //Server side errorS
      console.log('Server side error');
      if (error.status !== 0) {
        errorMessage = error.error.message;
        console.log(
          'Server side error - STATUS !==0: ' +
            error.error.message +
            ' | StatusCode: ' +
            error.error.statusCode
        );
      }
    }
    return errorMessage;
    // const { url, method, headers, body } = request;
    // // wrap in delayed observable to simulate server api call
    // return of(null).pipe(mergeMap(handleRoute));

    // function handleRoute() {
    //   switch (true) {
    //     case url.endsWith('/authenticate') && method === 'POST':
    //       return authenticate();
    //     default:
    //       // pass through any requests not handled above
    //       return next.handle(request);
    //   }
    // }

    // // route functions

    // function authenticate() {
    //   const { username, password } = body;
    //   const user = users.find(
    //     (x) => x.username === username && x.password === password
    //   );
    //   if (!user) {
    //     return error('Username or password is incorrect');
    //   }
    //   return ok({
    //     id: user.id,
    //     username: user.username,
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     token: user.token,
    //   });
    // }

    // // helper functions

    // function ok(body?: {
    //   id: number;
    //   username: string;
    //   firstName: string;
    //   lastName: string;
    //   token: string;
    // }) {
    //   return of(new HttpResponse({ status: 200, body }));
    // }

    // function error(message: string) {
    //   return throwError({ error: { message } });
    // }

    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // function unauthorized() {
    //   return throwError({ status: 401, error: { message: 'Unauthorised' } });
    // }

    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // function isLoggedIn() {
    //   return headers.get('Authorization') === 'Bearer fake-jwt-token';
    // }
  }
}

// export const fakeBackendProvider = {
//   // use fake backend in place of Http service for backend-less development
//   provide: HTTP_INTERCEPTORS,
//   useClass: FakeBackendInterceptor,
//   multi: true,
// };
