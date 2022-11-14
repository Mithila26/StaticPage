// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import 'rxjs/add/operator/do';import { AuthService } from './auth.service';
// export class JwtInterceptor implements HttpInterceptor {  constructor(public auth: AuthService) {}  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
      
//     return next.handle(request).pipe(tap((event: HttpEvent<any>) => {  
//       if (event instanceof HttpResponse) {  
//         console.log(event);
//       }  
//     }, (err: any) => {  
//       if (err instanceof HttpErrorResponse) {
//         console.log(err);  
//         if (err.status === 401) {  
//           // redirect to the login route  
//           // or show a modal  
//         }  
//       }  
//     }));  
//   }  
// }