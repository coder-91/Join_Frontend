import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {LoadingService} from "../../services/loadingService/loading.service";
import {finalize} from "rxjs";

export const networkInterceptorFn: HttpInterceptorFn = (req, next) => {
  let totalRequests = 0;
  let requestsCompleted = 0;

  const loadingService = inject(LoadingService);

  loadingService.show();
  totalRequests++;

  return next(req).pipe(
    finalize(() => {
      requestsCompleted++;

      if (requestsCompleted === totalRequests) {
        loadingService.hide();
        totalRequests = 0;
        requestsCompleted = 0;
      }
    })
  );
};
