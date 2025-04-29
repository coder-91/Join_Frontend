import {map} from "rxjs";
import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../../services/authService/auth.service";

export const LoggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) {
        router.navigateByUrl('/summary').then(() => {});
        return false;
      }
      return true;
    })
  );
};
