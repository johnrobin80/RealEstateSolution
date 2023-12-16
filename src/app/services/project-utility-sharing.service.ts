import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectUtilitySharingService {
  isPhotoUploaded = new BehaviorSubject<boolean>(false);

  public setphotoUploadedValue(value: boolean) {
    this.isPhotoUploaded.next(value);
  }
}
