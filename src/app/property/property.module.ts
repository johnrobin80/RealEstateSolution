import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';
import { PropertyAddComponent } from './property-add/property-add.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyCardComponent } from './property-list/property-card/property-card.component';
import { PropertyRoutingModule } from './property-routing.module';
//import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatStepperModule } from '@angular/material/stepper';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatChipsModule } from '@angular/material/chips';
import { NgModule } from '@angular/core';
import { PropertyValidationListingComponent } from './property-validation-listing/property-validation-listing.component';
import { LoadingSpinnerModule } from '../shared/loading-spinner/loading-spinner.module';
import { SharedModule } from '../shared/shared.module';
import { CanDeactivateGuard } from '../core/guard/auth-candeactivate-guard';
@NgModule({
  declarations: [
    PropertyAddComponent,
    PropertyListComponent,
    PropertyCardComponent,
    PropertyValidationListingComponent,
  ],
  providers: [CanDeactivateGuard],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ToastrModule.forRoot(),
    NgbModule,
    // MatPaginatorModule,
    // MatPaginatorModule,
    // MatInputModule,
    // MatFormFieldModule,
    // MatStepperModule,
    // MatButtonModule,
    // MatIconModule,
    // MatChipsModule,
    LoadingSpinnerModule,
    SharedModule,
  ],
})
export class PropertyModule {}
