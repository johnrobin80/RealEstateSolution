import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, mergeAll, tap } from 'rxjs';
import {
  AddCountry,
  Countries,
  IResponseData,
  UpdateCountry,
} from '../core/models/country';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  loadedPageName!: BehaviorSubject<string>;
  testSubject!: Subject<string>;
  countrySelectedDetails!: Countries;
  isRefreshRequired = new Subject<void>();

  //testSubject = new Subject<string>();
  constructor(private http: HttpClient) {
    this.loadedPageName = new BehaviorSubject<string>('AdminService');
    this.testSubject = new Subject();
  }

  refreshRequired() {
    return this.isRefreshRequired;
  }

  /*---------------------------------------COUNTRY------------------------------------------*/
  // getAllCountries(): Observable<Country[]> | any {
  //   const countries: Array<Country> = [];
  //   return this.http.get('assets/data/countries.json').pipe(
  //     map((data: Country[] | any) => {
  //       for (const id in data) {
  //         countries.push(data[id]);
  //       }
  //       return countries;
  //     })
  //   );
  // }

  getCountries(countryName: string): Observable<IResponseData> {
    return this.http.get<IResponseData>(
      `${environment.apiUrl}/Country/GetAllCountries/${countryName}`
    );
  }

  getCountrySelected(countryId: string): Observable<IResponseData> {
    return this.http.get<IResponseData>(
      `${environment.apiUrl}/Country/GetCountryById/${countryId}`
    );
  }

  addCountry(countryData: AddCountry): Observable<IResponseData> {
    return this.http
      .post<IResponseData>(`${environment.apiUrl}/Country/Add`, countryData)
      .pipe(
        tap((result) => {
          if (result.statusCode === 200) {
            this.refreshRequired().next();
          }
        })
      );
  }
  updateCountry(countryData: UpdateCountry): Observable<IResponseData> {
    return this.http
      .put<IResponseData>(`${environment.apiUrl}/Country/Update`, countryData)
      .pipe(
        tap((result) => {
          if (result.statusCode === 200) {
            this.refreshRequired().next();
          }
        })
      );
  }
  deleteCountry(countryId: number): Observable<IResponseData> {
    return this.http
      .delete<IResponseData>(
        `${environment.apiUrl}/Country/Delete/${countryId}`
      )
      .pipe(
        tap((result) => {
          if (result.statusCode === 200) {
            this.refreshRequired().next();
          }
        })
      );
  }
}
