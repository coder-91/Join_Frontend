import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { map, catchError, of } from 'rxjs';
import {AuthService} from "../../services/authService/auth.service";

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigateByUrl('/login').then(() => {});
    return of(false);
  }

  return authService.authHttpService.fetchLoggedUser().pipe(
    map(userDto => {
      authService.loggedUser = authService.dtoMapperService.mapUserDtoToUser(userDto);
      return true;
    }),
    catchError(() => {
      authService.sessionService.clearToken();
      router.navigateByUrl('/login').then(() => {});
      return of(false);
    })
  );
};
