import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CityComponent } from './city/city.component';
import { CountryListComponent } from './country-list/country-list.component';

const routes: Routes = [
  {
    path: 'country-list',
    component: CountryListComponent,
  },
  {
    path: 'city',
    component: CityComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
