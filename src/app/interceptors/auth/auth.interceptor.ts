import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {Router} from "@angular/router";
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' }
    });
  }

  return next(req).pipe(catchError((err) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        router.navigateByUrl('/login').then(r => {});
      }
    }
    return throwError(() => err);
  }));
};
