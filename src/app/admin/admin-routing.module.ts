import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CityComponent } from './city/city.component';
import { CountryListComponent } from './country-list/country-list.component';
import { TestAdminComponent } from './test-admin/test-admin.component';
import { Test2AdminComponent } from './test2-admin/test2-admin.component';

const routes: Routes = [
  {
    path: 'country-list',
    component: CountryListComponent,
  },
  {
    path: 'city',
    component: CityComponent,
  },
  {
    path: 'test-admin',
    component: TestAdminComponent,
  },
  {
    path: 'test2-admin',
    component: Test2AdminComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
