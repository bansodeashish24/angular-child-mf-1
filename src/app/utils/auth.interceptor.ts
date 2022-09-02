import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { DataProviderService } from '../services/data-provider.service';
import { SharedService } from '../services/shared.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  permittedUrls = [];
  accessToken = this.localStorageService.getItem('_accessToken');

  constructor(
    private localStorageService: LocalStorageService,
    private _sharedService: SharedService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      this.permittedUrls.find((allowedUrl) => request.url.includes(allowedUrl))
    ) {
      return next.handle(request);
    }
    const requestWithHeaders = this.getRequestWithHeader(request);
    return next.handle(requestWithHeaders).pipe(
      tap({
        error: (error: any) => {
          if (error.status === 401) {
            this._sharedService.sendForceLogoutRequestToParent();
          }
        },
        next: () => {},
      })
    );
  }

  getRequestWithHeader(request: any) {
    return request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${this.accessToken}`)
        .set('tenantid', 'testTenant'),
    });
  }
}
