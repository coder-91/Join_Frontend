import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if(localStorage.getItem('token') || sessionStorage.getItem("token")) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
