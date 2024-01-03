import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

import {
  ILoginInterface,
  ILoginResponse,
  ITokenData,
  User,
} from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<ITokenData>;
  public currentUser: Observable<ITokenData>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<ITokenData>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): ITokenData {
    return this.currentUserSubject.value;
  }

  login(formData: ILoginInterface): Observable<ILoginResponse> | any {
    // alert(
    //   `${environment.apiUrl}/Auth/Login` +
    //     ' | ' +
    //     formData.UserName +
    //     ' | ' +
    //     formData.Password
    // );
    return this.http.post<ILoginResponse>(
      `${environment.apiUrl}/Auth/Login`,
      formData
    );
    // .pipe(
    //   map((logResponse: ILoginResponse) => {
    //     if (logResponse.success === true) {
    //       alert(JSON.stringify(logResponse));
    //       alert(JSON.stringify(logResponse.data.token));
    //       // store user details and jwt token in local storage to keep user logged in between page refreshes
    //       // console.log(JSON.stringify(user));
    //       localStorage.setItem(
    //         'currentUser',
    //         JSON.stringify(logResponse.data)
    //       );
    //       this.currentUserSubject.next(logResponse.data);
    //       return logResponse;
    //     } else {
    //       return logResponse;
    //     }
    //   })
    // );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }
}
