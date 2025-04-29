import { CanActivateFn } from '@angular/router';
import { inject } from "@angular/core";
import {catchError, map, of} from 'rxjs';
import {AuthService} from "../../services/authService/auth.service";

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.validateToken().pipe(
    map((isValid) => {
      if (!isValid) {
        authService.logout();
        return false;
      }
      return true;
    }),
    catchError(() => {
      authService.logout();
      return of(false);
    })
  );
};
