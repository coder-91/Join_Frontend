import {of} from "rxjs";
import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../../services/authService/auth.service";

export const LoggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    router.navigateByUrl('/summary').then(() => {});
    return of(false);
  }
  return of(true);
};
