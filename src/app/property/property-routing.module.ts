import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyAddComponent } from './property-add/property-add.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { CanDeactivateGuard } from '../core/guard/auth-candeactivate-guard';

const routes: Routes = [
  {
    path: 'property-list',
    component: PropertyListComponent,
  },
  {
    path: 'property-adding/:id',
    component: PropertyAddComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyRoutingModule {}
