import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from "rxjs";
import { inject } from "@angular/core";
import {SessionService} from "../../services/sessionService/session.service";
import {AuthService} from "../../services/authService/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
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
        authService.logout();
      }
      return throwError(() => err);
    })
  );
};
