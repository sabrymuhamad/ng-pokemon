import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';


export const ToastrInterceptor: HttpInterceptorFn = (request, next) => {
  const _toastr = inject(ToastrService);
  return next(request).pipe(
    catchError((err: HttpErrorResponse) => {
      _toastr.error(err.error);
      return throwError(() => err)
    }),

  );
}