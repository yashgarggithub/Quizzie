import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

const TOKEN_HEADER = 'Authorization';

@Injectable() //to be able to inject it
export class AuthInterceptor implements HttpInterceptor {
  constructor(private login: LoginService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //add the jwt token (localStorage) request
    let authReq = req;
    const token = this.login.getToken();
    console.log('inside interceptor');

    if (token != null) {  //valid
      authReq = authReq.clone({ //cloning token from localStorage and setting header to request with 'Bearer '
        setHeaders: { TOKEN_HEADER: `Bearer ${token}` },
      });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
