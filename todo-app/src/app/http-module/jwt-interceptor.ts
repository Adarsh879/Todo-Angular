import { DOCUMENT } from '@angular/common';
import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class JwtInterceptorHttpModule implements HttpInterceptor{

//   localStorage?: Storage;

//   constructor( @Inject(DOCUMENT) private document: Document) {
//     this.localStorage = this.document.defaultView?.localStorage;
//    }

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
//   {
//     let token = this.localStorage?.getItem('token');
//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     }
//     return next.handle(request);
//   }
// }

export function AuthInteceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  let token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
}