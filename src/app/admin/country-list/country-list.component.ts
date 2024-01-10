import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/core/models/country';
import { AdminService } from 'src/app/core/service/admin.service';
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
import { PageMode } from 'src/app/enums/enums-handler';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  providers: [ToastrService],
})
export class CountryListComponent implements OnInit {
  countries: Array<Country> = [];
  countryValues!: Country | any;
  scrollBarHorizontal = window.innerWidth < 1000;
  reorderable = true;
  loadingIndicator = true;
  public selected: number[] = [];
  selection!: SelectionType;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  register!: UntypedFormGroup;
  modelLabelName!: string;

  page = 1; /*The current page.*/
  pageSize = 5; /*Number of elements/items per page.*/
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
    this.loadData();
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

  loadData() {
    this.adminService.getAllCountries().subscribe((data: Country[]) => {
      setTimeout(() => {
        this.countries = data;
        console.log('---------Country List----------');
        console.log(this.countries);
        this.loadingIndicator = false;
        this.modelLabelName = 'Add';
      }, 300);
    });
  }

  editRow(content: any, dataRowId: any, tableRowIndex: number) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      ariaLabelledBy: 'modal-basic-title',
      size: 'sm',
      keyboard: false,
    };
    console.log(dataRowId);
    this.modelLabelName = 'Update';
    this.countryValues = this.countries.find((x) => x.id === dataRowId);
    this.Country.setValue(this.countryValues.country);
    this.CountryCode.setValue(this.countryValues.countryCode);
    this.modalService.open(content, ngbModalOptions);
    // this.toastrService.success('Edit record successfully', '', {
    //   progressBar: true,
    // });
  }
  deleteSingleRow(row: any) {
    console.log(row);
    Swal.fire({
      title: 'Delete?',
      text: 'Do you want to delete the selected row!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        console.log('Deleted - ' + result.value);
        // Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        Swal.fire({
          title: 'Deleted!',
          text: 'The selected row data has been deleted.',
          icon: 'success',
          allowOutsideClick: false,
        });
        this.toastrService.success(
          'Country ' + row.country + ' deleted successfully',
          '',
          {
            progressBar: true,
          }
        );
      } else {
        console.log('Not-Deleted - ' + result.value);
      }
    });
  }

  // add new record
  // addRow(content: any) {
  //   this.modalService.open(content, {
  //     ariaLabelledBy: 'modal-basic-title',
  //     size: 'sm',
  //   });
  // }

  // addRow(content: any) {
  //   const ngbModalOptions: NgbModalOptions = {
  //     backdrop: 'static',
  //     keyboard: false,

  //   };
  //   console.log(ngbModalOptions);

  //   this.modalService.open(
  //     content,
  //     {
  //       ariaLabelledBy: 'modal-basic-title',
  //       size: 'sm',
  //     },
  //   );
  // }

  addRow(content: any) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      ariaLabelledBy: 'modal-basic-title',
      size: 'sm',
      keyboard: false,
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

  addCountry() {
    this.toastrService.success('Added record successfully', '', {
      progressBar: true,
    });
    this.resetControls();
    this.modalService.dismissAll();
  }

  resetControls() {
    this.register.reset();
  }

  closeModalForm() {
    this.resetControls();
    this.modalService.dismissAll();
  }
}
