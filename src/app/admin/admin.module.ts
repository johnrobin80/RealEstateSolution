import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CityComponent } from './city/city.component';
import { CountryListComponent } from './country-list/country-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';
import { AdminService } from '../admin/admin.service';
import { DatafilteringPipe } from '../pipes/datafiltering.pipe';
import { TestAdminComponent } from './test-admin/test-admin.component';
import { Test2AdminComponent } from './test2-admin/test2-admin.component';
import { TestService } from './test2-admin/test.service';
@NgModule({
  declarations: [
    CityComponent,
    CountryListComponent,
    DatafilteringPipe,
    TestAdminComponent,
    Test2AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgbModule,
    ToastrModule.forRoot(),
  ],
  exports: [],
  providers: [AdminService, TestService],
})
export class AdminModule {}
