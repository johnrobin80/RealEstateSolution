import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { AdminService } from '../admin.service';
import { Countries, IResponseData } from 'src/app/core/models/country';

@Component({
  selector: 'app-test-admin',
  templateUrl: './test-admin.component.html',
  styleUrls: ['./test-admin.component.scss'],
})
export class TestAdminComponent implements OnInit, AfterViewInit {
  @ViewChild('search', { static: false }) search: any;
  @ViewChild(DatatableComponent) table!: DatatableComponent;

  name = 'Ngx Datatables Filter All Columns';
  public temp: Array<object> = [];
  public rows: Array<object> = [];
  public columns!: Array<object>;
  countries: Array<Countries> = [];

  scrollBarHorizontal = window.innerWidth < 1000;
  reorderable = true;
  loadingIndicator = true;
  public selected: number[] = [];
  selection!: SelectionType;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  page = 1; /*The current page.*/
  pageSize = 10; /*Number of elements/items per page.*/
  collectionSize = 15; /*Number of elements/items in the collection. i.e. the total number of items the pagination should handle.*/
  modelLabelName!: string;

  constructor(
    private httpClient: HttpClient,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    // Initial columns, can be used for data list which is will be filtered
    this.columns = [
      { prop: 'countryname', name: 'Country' },
      { prop: 'countrycode', name: 'Code' },
      { prop: 'createdon', name: 'CreatedOn' },
      { prop: 'statusname', name: 'Status' },
      { name: 'Actions' },
    ];

    // this.columns = [
    //   { prop: 'name', name: 'Name' },
    //   { prop: 'company', name: 'Company' },
    //   { prop: 'gender', name: 'Gender' },
    //   { prop: 'age', name: 'Age' },
    // ];

    this.loadCountries();
    //this.getDataJson();
    // this.findAll();
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    fromEvent(this.search.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map((x: any) => x['target']['value'])
      )
      .subscribe((value) => {
        this.updateFilter(value);
      });
  }

  updateFilter(val: any) {
    const value = val.toString().toLowerCase().trim();
    //alert(value);
    const rowCount = this.temp.length;
    // get the amount of columns in the table
    const colCount = this.columns.length;
    //alert(rowCount + ' | ' + colCount);
    // get the key names of each column in the dataset
    const keys = Object.keys(this.temp[0]);
    //alert(keys);
    // assign filtered matches to the active datatable
    this.rows = this.temp.filter((item: any) => {
      // iterate through each row's column data

      for (let colIndx = 0; colIndx < colCount - 1; colIndx++) {
        //alert('Index ==> ' + (colIndx + 1));
        // check for a match
        //alert('Item-Key ==> ' + item[keys[colIndx + 1]].toString());
        if (
          (item[keys[colIndx + 1]] &&
            item[keys[colIndx + 1]].toString().toLowerCase().indexOf(value) !==
              -1) ||
          !value
        ) {
          // found match, return true to add to result set
          return true;
        }
        // else {
        //   return false;
        // }
      }

      return false;
    });

    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  // findAll() {
  //   this.httpClient.get('./assets/data/company.json').subscribe(
  //     (data: any) => {
  //       // cache our list
  //       this.temp = data;

  //       // push our inital complete list
  //       this.rows = [...this.temp];
  //     },
  //     (err: HttpErrorResponse) => {
  //       console.log(err.message);
  //     }
  //   );
  // }

  loadCountries() {
    // this.adminService.getAllCountries().subscribe((data: Country[]) => {
    //   setTimeout(() => {
    //     this.countries = data;
    //     console.log('---------Country List----------');
    //     console.log(this.countries);
    //     this.loadingIndicator = false;
    //     this.modelLabelName = 'Add';
    //   }, 300);
    // });

    this.adminService.getCountries('0').subscribe((data: IResponseData) => {
      this.countries = this.rows = this.temp = data.data;
      console.log('---------Country List----------');
      console.log(this.countries);
      this.loadingIndicator = false;
      this.modelLabelName = 'Add';
    });
  }

  getDataJson() {
    this.rows = this.temp = [
      {
        name: 'Ethel Price',
        gender: 'female',
        company: 'Johnson, Johnson and Partners, LLC CMP DDC',
        age: 22,
      },
      {
        name: 'Claudine Neal',
        gender: 'female',
        company: 'Sealoud',
        age: 55,
      },
      {
        name: 'Beryl Rice',
        gender: 'female',
        company: 'Velity',
        age: 67,
      },
      // {
      //   name: 'Wilder Gonzales',
      //   gender: 'male',
      //   company: 'Geekko',
      // },
      // {
      //   name: 'Georgina Schultz',
      //   gender: 'female',
      //   company: 'Suretech',
      // },
      // {
      //   name: 'Carroll Buchanan',
      //   gender: 'male',
      //   company: 'Ecosys',
      // },
      // {
      //   name: 'Valarie Atkinson',
      //   gender: 'female',
      //   company: 'Hopeli',
      // },
      // {
      //   name: 'Schroeder Mathews',
      //   gender: 'male',
      //   company: 'Polarium',
      // },
      // {
      //   name: 'Lynda Mendoza',
      //   gender: 'female',
      //   company: 'Dogspa',
      // },
    ];
  }
}
