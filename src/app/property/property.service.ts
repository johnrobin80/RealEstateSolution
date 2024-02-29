import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  public blnReadyForClearing = new BehaviorSubject<boolean>(false);
  getCountries() {
    return '';
  }

  getCities() {
    return '';
  }
}
