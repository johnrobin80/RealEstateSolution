import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  loadedPageName!: BehaviorSubject<string>;
  testSubject!: Subject<string>;
  //testSubject = new Subject<string>();
  constructor(private http: HttpClient) {
    this.loadedPageName = new BehaviorSubject<string>('AdminService');
    this.testSubject = new Subject();
  }

  /*---------------------------------------COUNTRY------------------------------------------*/
  getAllCountries(): Observable<Country[]> | any {
    const countries: Array<Country> = [];
    return this.http.get('assets/data/countries.json').pipe(
      map((data: Country[] | any) => {
        for (const id in data) {
          countries.push(data[id]);
        }
        return countries;
      })
    );
  }
}
