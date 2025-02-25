import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { UtilityService } from '@pokemon/services';

export const LoaderInterceptor: HttpInterceptorFn = (req, next) => {
  const _loaderState = inject(UtilityService);

  if (req.headers.has('showSpinner') && req.headers.get('showSpinner') === 'true') {
    _loaderState.loaderState.update(state => { return { show: true } });
  }

  // Pass the cloned request with the updated header to the next handler
  return next(req).pipe(
    finalize(() => {
      _loaderState.loaderState.update(state => { return { show: false } });
    }),
  );
};