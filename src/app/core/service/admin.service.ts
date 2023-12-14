import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

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
