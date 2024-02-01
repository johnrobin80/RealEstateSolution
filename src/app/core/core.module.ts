import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSidebarService } from './service/rightsidebar.service';
import { AuthGuard } from './guard/auth.guard';

import { throwIfAlreadyLoaded } from './guard/module-import.guard';
import { DirectionService } from './service/direction.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CanDeactivateGuard } from './guard/auth-candeactivate-guard';
// import { FilterDataPipe } from '../pipes/filterdata.pipe';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
  providers: [
    RightSidebarService,
    AuthGuard,
    CanDeactivateGuard,
    DirectionService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
