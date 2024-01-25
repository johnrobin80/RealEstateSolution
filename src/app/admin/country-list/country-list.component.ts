import { Component, OnInit } from '@angular/core';
import {
  AddCountry,
  Countries,
  IResponseData,
  UpdateCountry,
} from 'src/app/core/models/country';
import { AdminService } from 'src/app/admin/admin.service';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  UntypedFormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  providers: [ToastrService],
})
export class CountryListComponent implements OnInit {
  countries: Array<Countries> = [];
  countryValues!: Countries;
  addCountryValues!: AddCountry;
  updateCountryValues!: UpdateCountry;
  scrollBarHorizontal = window.innerWidth < 1000;
  reorderable = true;
  loadingIndicator = true;
  public selected: number[] = [];
  selection!: SelectionType;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  register!: UntypedFormGroup;
  modelLabelName!: string;
  countryIdSelected = 0;

  page = 1; /*The current page.*/
  pageSize = 10; /*Number of elements/items per page.*/
  collectionSize = 15; /*Number of elements/items in the collection. i.e. the total number of items the pagination should handle.*/
  constructor(
    private adminService: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private fb: UntypedFormBuilder,
    private toastrService: ToastrService
  ) {
    window.onresize = () => {
      this.scrollBarHorizontal = window.innerWidth < 1000;
    };
  }

  ngOnInit(): void {
    this.loadControls();
    this.loadCountries();
    //alert('Data loaded successfully!!');
    console.log(this.register);
  }

  loadControls() {
    this.register = this.fb.group({
      country: [null, [Validators.required]],
      countryCode: [null, []],
      active: [null, []],
    });
  }

  get Country() {
    return this.register.controls['country'] as UntypedFormControl;
  }
  get CountryCode() {
    return this.register.controls['countryCode'] as UntypedFormControl;
  }
  get Active() {
    return this.register.controls['active'] as UntypedFormControl;
  }

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
      this.countries = data.data;
      console.log('---------Country List----------');
      console.log(this.countries);
      this.loadingIndicator = false;
      this.modelLabelName = 'Add';
    });
  }

  addRow(content: any) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      ariaLabelledBy: 'modal-basic-title',
      size: 'sm',
      keyboard: false,
      centered: true,
    };
    console.log(ngbModalOptions);
    this.modelLabelName = 'Add';
    this.modalService.open(content, ngbModalOptions);
    // if(loadType === PageMode.add.toString())
    // {
    //   console.log(loadType);
    // }
    // else if (loadType === PageMode.edit.toString()) {
    //   console.log(loadType);
    // }
  }

  viewRow(content: any, dataRowId: number, tableRowIndex: number) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      ariaLabelledBy: 'modal-basic-title',
      size: 'sm',
      keyboard: false,
      centered: true,
    };
    this.countryIdSelected = dataRowId;
    this.modelLabelName = 'Update';
    // this.countryValues = this.countries.find((x) => x.id === dataRowId);
    this.adminService
      .getCountrySelected(dataRowId.toString())
      .subscribe((data: IResponseData) => {
        //this.countryValues = data.data[0];
        console.log(data.success);
        this.Country.setValue(data.data[0].countryname);
        this.CountryCode.setValue(data.data[0].countrycode);
        this.Active.setValue(
          data.data[0].statusname === 'Active' ? true : false
        );
      });
    this.modalService.open(content, ngbModalOptions);

    // this.countries.forEach((x) => {
    //   x.countryid === dataRowId
    //     ? (x.countryname = x.countryname + ' - Rob')
    //     : '';
    // });

    // this.toastrService.success('Edit record successfully', '', {
    //   progressBar: true,
    // });
  }

  deleteCountry(countryId: number, countryName: string) {
    console.log(countryId);
    if (countryId !== 0) {
      Swal.fire({
        title: 'Delete?',
        text:
          'Do you want to delete the country ' + '"' + countryName + '"' + '!',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.value) {
          // Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          this.adminService
            .deleteCountry(countryId)
            .subscribe((data: IResponseData) => {
              console.log('DELETE => ' + data.message);
              if (data.success === true && data.statusCode === 200) {
                this.loadCountries();
                Swal.fire({
                  title: 'Deleted!',
                  text:
                    'The country ' +
                    '"' +
                    countryName +
                    '"' +
                    ' has been deleted.',
                  icon: 'success',
                  allowOutsideClick: false,
                });
                this.toastrService.success(
                  'Country ' +
                    '"' +
                    countryName +
                    '"' +
                    ' has been deleted successfully',
                  '',
                  {
                    progressBar: true,
                  }
                );
              } else {
                this.toastrService.error(data.message, '', {
                  progressBar: true,
                });
              }
            });
        } else {
          console.log('Not-Deleted - ');
        }
      });
    }
  }

  submitCountry(submitMode: string) {
    if (submitMode === 'Add') {
      //alert('add');
      this.addCountryValues = {
        countryname: this.Country.value,
        countrycode: this.CountryCode.value,
        isactive: this.Active.value,
      };
      this.adminService
        .addCountry(this.addCountryValues)
        .subscribe((data: IResponseData) => {
          if (data.success === true && data.statusCode === 200) {
            this.toastrService.success('Created successfully', '', {
              progressBar: true,
            });
            this.resetControls();
            this.loadCountries();
          }
        });
    } else if (submitMode === 'Update') {
      if (this.countryIdSelected !== 0) {
        //alert('update ==> ' + this.countryIdSelected);
        this.updateCountryValues = {
          countryid: this.countryIdSelected,
          countryname: this.Country.value,
          countrycode: this.CountryCode.value,
          isactive: this.Active.value,
        };
        this.adminService
          .updateCountry(this.updateCountryValues)
          .subscribe((data: IResponseData) => {
            if (data.success === true && data.statusCode === 200) {
              this.toastrService.success('Updated successfully', '', {
                progressBar: true,
              });
              this.resetControls();
              this.loadCountries();
            }
          });
      }
    }
  }

  resetControls() {
    this.register.reset();
    this.modalService.dismissAll();
  }

  closeModalForm() {
    this.resetControls();
    this.modalService.dismissAll();
  }
}
