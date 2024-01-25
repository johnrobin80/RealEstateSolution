import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CityComponent } from './city/city.component';

import { CountryListComponent } from './country-list/country-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AdvanceTableRoutingModule } from '../advance-table/advance-table-routing.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';
import { AdminService } from '../admin/admin.service';

@NgModule({
  declarations: [CityComponent, CountryListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // AdvanceTableRoutingModule,
    NgxDatatableModule,
    NgbModule,
    ToastrModule.forRoot(),
  ],
  providers: [AdminService],
})
export class AdminModule {}
