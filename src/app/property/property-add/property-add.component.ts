import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, share } from 'rxjs';
import { CheckForNullValidation } from 'src/app/custom-functions/validations/check-value-isnull';
import {
  ValidationDataList,
  ValidationDetails,
  ValidationHeaders,
} from 'src/app/models/validation-lists';
import { ProjectUtilitySharingService } from 'src/app/services/project-utility-sharing.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.component.html',
  styleUrls: ['./property-add.component.scss'],
  providers: [ToastrService],
})
export class PropertyAddComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper: any;
  @ViewChild('content') content: any;
  @ViewChild('validationList') validationList: any;
  basicInfo!: FormGroup;
  pricingAndArea!: FormGroup;
  address!: FormGroup;
  otherDetails!: FormGroup;
  photos!: FormGroup;
  done!: FormGroup;
  businessMode: Array<string> = ['Rent', 'Sell'];
  homeCapacity: Array<number> = [1, 2, 3, 4, 5, 6];
  propertyTypes: Array<string> = ['Apartment', 'Duplex', 'House'];
  furnishTypes: Array<string> = ['Unfurnished', 'Semi', 'Fully'];
  readyToMoveProperty: Array<string> = ['Yes', 'No'];
  gatedCommunityProperty: Array<string> = ['Yes', 'No'];
  mainEntranceProperty: Array<string> = ['East', 'West', 'North', 'South'];
  nextClicked!: boolean;
  isLinear = true;
  userSubmitted!: boolean;
  validationErrors: Array<string> = [];
  isvalidationErrorList!: boolean;

  validationHeaderAndDetail: Array<ValidationDataList> = [];
  validationDetailValues: Array<ValidationDetails> = [];
  validationHeaderValue!: ValidationHeaders;
  checkPhoto!: Observable<boolean>;
  photoUploadCheckSubscription!: Subscription;
  hasPhotoUploaded!: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private prjUtlService: ProjectUtilitySharingService
  ) {}

  ngOnInit(): void {
    this.onCreatingTheControls();
    setTimeout(() => {
      this.stepper.selectedIndex = 0;
      this.isvalidationErrorList = true;
      //this.photos.setErrors({ invalid: true });
      //this.done.setErrors({ invalid: true });
      this.checkPhoto = this.prjUtlService.isPhotoUploaded.pipe(share());
      //this.photos.setErrors({ invalid: true });
      this.photoUploadCheckSubscription = this.checkPhoto.subscribe(
        (data: boolean) => {
          this.hasPhotoUploaded = data;
          this.tabValidation();
        }
      );
    }, 100);
  }

  tabValidation() {
    if (this.hasPhotoUploaded === true) {
      this.photoHiddenLabel.setValue(this.hasPhotoUploaded);
    } else {
      this.photoHiddenLabel.setValue('');
    }
    if (
      this.basicInfo.valid &&
      this.pricingAndArea.valid &&
      this.address.valid &&
      this.otherDetails.valid &&
      this.photos.valid
    ) {
      this.doneHiddenLabel.setValue('done');
    } else {
      this.doneHiddenLabel.setValue('');
    }
  }

  onCreatingTheControls() {
    this.basicInfo = this._formBuilder.group({
      sellRent: ['Rent', Validators.required],
      bhk: [1, Validators.required],
      propertyType: ['Apartment', Validators.required],
      furnishType: ['Unfurnished', Validators.required],
      buildingAndArea: [null, Validators.required],
      cityList: [null, [Validators.required, CheckForNullValidation()]],
    });
    this.pricingAndArea = this._formBuilder.group({
      priceInUsd: ['', [Validators.required]],
      securityInUsd: ['', []],
      maintenanceInUsd: ['', []],
      builtArea: ['', Validators.required],
      carpetArea: ['', []],
    });
    this.address = this._formBuilder.group({
      floor: ['', [Validators.required]],
      totalFloors: ['', []],
      addressDetails: ['', [Validators.required]],
      landMark: ['', []],
    });
    this.otherDetails = this._formBuilder.group({
      readyToMove: ['Yes', Validators.required],
      gatedCommunity: ['Yes', Validators.required],
      mainEntrance: ['East', Validators.required],
      availableFrom: ['', Validators.required],
      ageOfProperty: ['', Validators.required],
      comment: ['', []],
    });
    this.photos = this._formBuilder.group({
      photoHiddenLabel: ['', [Validators.required]],
    });
    this.done = this._formBuilder.group({
      doneHiddenLabel: ['', [Validators.required]],
    });
  }

  // #region <Form Groups>
  // #region <Form Controls>
  get sellRent() {
    return this.basicInfo.controls['sellRent'] as FormControl;
  }
  get bhk() {
    return this.basicInfo.controls['bhk'] as FormControl;
  }
  get propertyType() {
    return this.basicInfo.controls['propertyType'] as FormControl;
  }
  get furnishType() {
    return this.basicInfo.controls['furnishType'] as FormControl;
  }
  get buildingAndArea() {
    return this.basicInfo.controls['buildingAndArea'] as FormControl;
  }
  get cityList() {
    return this.basicInfo.controls['cityList'] as FormControl;
  }

  get priceInUsd() {
    return this.pricingAndArea.controls['priceInUsd'] as FormControl;
  }
  get securityInUsd() {
    return this.pricingAndArea.controls['securityInUsd'] as FormControl;
  }
  get maintenanceInUsd() {
    return this.pricingAndArea.controls['maintenanceInUsd'] as FormControl;
  }
  get builtArea() {
    return this.pricingAndArea.controls['builtArea'] as FormControl;
  }
  get carpetArea() {
    return this.pricingAndArea.controls['carpetArea'] as FormControl;
  }

  get floor() {
    return this.address.controls['floor'] as FormControl;
  }
  get totalFloors() {
    return this.address.controls['totalFloors'] as FormControl;
  }
  get addressDetails() {
    return this.address.controls['addressDetails'] as FormControl;
  }
  get landMark() {
    return this.address.controls['landMark'] as FormControl;
  }

  get readyToMove() {
    return this.otherDetails.controls['readyToMove'] as FormControl;
  }
  get gatedCommunity() {
    return this.otherDetails.controls['gatedCommunity'] as FormControl;
  }
  get mainEntrance() {
    return this.otherDetails.controls['mainEntrance'] as FormControl;
  }
  get availableFrom() {
    return this.otherDetails.controls['availableFrom'] as FormControl;
  }
  get ageOfProperty() {
    return this.otherDetails.controls['ageOfProperty'] as FormControl;
  }
  get comment() {
    return this.otherDetails.controls['comment'] as FormControl;
  }

  get photoHiddenLabel() {
    return this.photos.controls['photoHiddenLabel'] as FormControl;
  }

  get doneHiddenLabel() {
    return this.done.controls['doneHiddenLabel'] as FormControl;
  }

  onSubmit() {
    console.log(this.basicInfo);
    console.log(this.bhk.touched);
    this.userSubmitted = true;
    Swal.fire({
      title: 'Data submission?',
      text: 'Do you want to proceed with submitting the data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Please proceed',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.userSubmitted = false;
        this.modalService.open(this.content, {
          centered: true,
          backdrop: 'static',
          keyboard: false,
        });
        console.log('Submitted - ' + result.value);

        this.toastrService.success('Submitted successfully', '', {
          progressBar: true,
        });
        setTimeout(() => {
          this.modalService.dismissAll();
          this.stepper.reset();
          this.onCreatingTheControls();
        }, 5000);
      } else {
        console.log('Not-Submitted - ' + result.value);
      }
    });
    window.scrollTo(0, 0);
  }

  resetStepper() {
    Swal.fire({
      title: 'Do you want to reset the form?',
      text: 'Resetting the form will loose all your data.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Reset',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.stepper.reset();
        this.onCreatingTheControls();
        console.log('Reset - ' + result.value);
        // Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        Swal.fire({
          title: 'Reset Success',
          text: 'Form reset has been completed.',
          icon: 'success',
          allowOutsideClick: false,
        });
        this.toastrService.success('Form reset has been completed', '', {
          progressBar: true,
        });
      } else {
        console.log('No reset - ' + result.value);
      }
    });
    window.scrollTo(0, 0);
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  onCitySelectedValue(value: any) {
    console.log(value);
  }

  setValidationHeader(headerValue: string) {
    this.validationHeaderValue = {
      validationHeader: headerValue,
    };
  }

  setValidationFormDetails(formValue: string) {
    this.validationDetailValues.push({
      validationDetail: formValue,
    });
  }

  setValidationHeaderAndDetails(
    headers: ValidationHeaders,
    detailData: Array<ValidationDetails>
  ) {
    this.validationHeaderAndDetail.push({
      header: headers,
      details: detailData,
    });
  }

  public onStepChange(event: any): void {
    console.log(event.selectedIndex);
    this.tabValidation();
    if (event.selectedIndex == 4) {
      console.log('this.photos.invalid ==> ' + this.photos.invalid);
      console.log(this.photos.valid);
      console.log(this.photos);
    }

    if (event.selectedIndex == 5) {
      this.validationHeaderAndDetail = [];
      this.isvalidationErrorList = false;
      if (this.basicInfo.invalid) {
        this.validationDetailValues = [];
        this.setValidationHeader('Basic Info:');
        if (this.sellRent.invalid) {
          this.setValidationFormDetails('I Want to');
        }
        if (this.bhk.invalid) {
          this.setValidationFormDetails('BHK');
        }
        if (this.propertyType.invalid) {
          this.setValidationFormDetails('Property Type');
        }
        if (this.furnishType.invalid) {
          this.setValidationFormDetails('Furnish Type');
        }
        if (this.buildingAndArea.invalid) {
          this.setValidationFormDetails('Building/Society/Project');
        }
        if (this.cityList.invalid) {
          this.setValidationFormDetails('City');
        }
        this.setValidationHeaderAndDetails(
          this.validationHeaderValue,
          this.validationDetailValues
        );
      }
      if (this.pricingAndArea.invalid) {
        this.validationDetailValues = [];
        this.setValidationHeader('Pricing & Area:');
        if (this.priceInUsd.invalid) {
          this.setValidationFormDetails('Price (in USD)');
        }
        if (this.builtArea.invalid) {
          this.setValidationFormDetails('Built Area (Sq.Feet)');
        }
        this.setValidationHeaderAndDetails(
          this.validationHeaderValue,
          this.validationDetailValues
        );
      }
    } else {
      this.isvalidationErrorList = true;
    }
    console.log(this.isvalidationErrorList);
  }

  ngOnDestroy(): void {
    this.photoUploadCheckSubscription.unsubscribe();
  }
}
