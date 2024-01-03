import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    //const currentUser = this.authenticationService.currentUserValue;

    if (currentUser && currentUser.token) {
      console.log('JwtInterceptor ==> ' + currentUser.username);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      console.log('JWT Request: ' + request.headers.get('Authorization'));
    } else {
      console.log('JwtInterceptor ==> No Data');
      this.authenticationService.logout();
      this.router.navigate(['/authentication/signin']);
    }

    return next.handle(request);
  }
}
