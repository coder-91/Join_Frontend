import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { inject } from "@angular/core";
import {SessionService} from "../../services/sessionService/session.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const sessionService = inject(SessionService);
  const token = sessionService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `${sessionService.TOKEN_KEY} ${token}`, 'Content-Type': 'application/json' }
    });
  }

  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        sessionService.clearToken();
        router.navigateByUrl('/login').then(r => {});
      }
      return throwError(() => err);
    })
  );
};
