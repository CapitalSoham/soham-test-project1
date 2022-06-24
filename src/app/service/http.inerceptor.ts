import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HTTP_INTERCEPTORS,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService) {}
  
    intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
      this.loaderService.show()
      request = request.clone({
        headers: request.headers.set('authorization', "Bearer jwttoken"),
      });
      console.log(request);
      
      return next.handle(request).pipe(
        finalize(()=> this.loaderService.hide())
      );
    }
  }
  
  export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  };