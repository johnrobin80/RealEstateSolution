import { Component, Input, OnInit } from '@angular/core';
import {
  ValidationDataList,
  ValidationDetails,
  ValidationHeaders,
} from 'src/app/models/validation-lists';

@Component({
  selector: 'app-property-validation-listing',
  templateUrl: './property-validation-listing.component.html',
  styleUrls: ['./property-validation-listing.component.scss'],
})
export class PropertyValidationListingComponent implements OnInit {
  @Input() validationData: Array<ValidationDataList> = [];
  detailData: Array<ValidationDetails> = [];
  headers!: ValidationHeaders;

  ngOnInit(): void {
    //alert('Data Loading');
    //this.loadData();
    console.log(
      'Validation Data Loading ==> PropertyValidationListingComponent'
    );
  }

  //   loadData() {
  //     //alert('Start data loading');
  //     this.validationData = [];
  //     this.detailData = [];
  //     this.headers = {
  //       validationHeader: 'BaseInfo',
  //     };
  //     //alert('validationHeader');
  //     // this.detailData = [
  //     //   {
  //     //     validationDetail: 'Test1',
  //     //   },
  //     //   {
  //     //     validationDetail: 'Test2',
  //     //   },
  //     // ];
  //     this.detailData.push({
  //       validationDetail: 'I want to',
  //     });
  //     this.detailData.push({
  //       validationDetail: 'BHK',
  //     });
  //     this.detailData.push({
  //       validationDetail: 'Property Type',
  //     });
  //     //alert('validationDetail');

  //     // this.validationData = [
  //     //   {
  //     //     header: this.headers,
  //     //     details: this.detailData,
  //     //   },
  //     // ];

  //     this.validationData.push({
  //       header: this.headers,
  //       details: this.detailData,
  //     });
  //   }
}
