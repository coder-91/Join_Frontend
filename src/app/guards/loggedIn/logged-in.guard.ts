import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const LoggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
    router.navigateByUrl('/summary');
    return false;
  } else {
    return true;
  }
};
