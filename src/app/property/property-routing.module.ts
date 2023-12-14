import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyAddComponent } from './property-add/property-add.component';
import { PropertyListComponent } from './property-list/property-list.component';

const routes: Routes = [
  {
    path: 'property-list',
    component: PropertyListComponent,
  },
  {
    path: 'property-adding/:id',
    component: PropertyAddComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyRoutingModule {}
