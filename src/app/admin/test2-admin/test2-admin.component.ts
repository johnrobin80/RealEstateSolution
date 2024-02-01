import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test2-admin',
  templateUrl: './test2-admin.component.html',
  styleUrls: ['./test2-admin.component.scss'],
})
export class Test2AdminComponent {
  columns: any = {};

  constructor() {
    this.columns = [
      {
        key: 'id',
        title: '<div class="blue"><i class="fa fa-id-card-o"></i> ID</div>',
        width: 60,
        sorting: true,
        align: { head: 'center', body: 'center' },
        vAlign: { head: 'bottom', body: 'middle' },
      },
      {
        key: 'name',
        title: '<div class="blue"><i class="fa fa-user"></i> Name</div>',
        width: 100,
      },
      {
        key: 'gender',
        title: '<div class="blue"><i class="fa fa-phone"></i> Gender</div>',
        align: { head: 'left' },
        width: 100,
        sorting: true,
      },
      {
        key: 'address',
        title:
          '<div class="blue"><i class="fa fa-building"></i>  Address</div>',
        width: 300,
        sorting: false,
        align: { head: 'left', body: 'right' },
      },
      {
        key: 'age',
        title:
          '<div class="blue"><i class="fa fa-calendar-times-o"></i> Age</div>',
        width: 60,
        sorting: true,
        align: { head: 'center', body: 'center' },
      },
      {
        key: 'zip',
        title: '<div class="blue">Action</div>',
        align: { head: 'center', body: 'center' },
        sorting: false,
        width: 80,
      },
    ];
  }
}
