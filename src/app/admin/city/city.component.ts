import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  constructor(private adminService: AdminService) {
    this.adminService.loadedPageName.next('CityComponent');
    this.adminService.testSubject.next('Robin');
  }
  ngOnInit(): void {
    this.adminService.loadedPageName.subscribe({
      next: (res) => {
        console.log(res);
      },
    });

    this.adminService.testSubject.subscribe((val: string) => {
      console.log('Subject Value => ' + val);
    });
  }
}
