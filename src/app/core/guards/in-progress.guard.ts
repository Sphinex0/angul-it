import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CaptchaService } from '../services/captcha.service';

export const inProgressGuard: CanActivateFn = (route, state) => {
  const service = inject(CaptchaService);
  const router = inject(Router);

  if (service.isFinished()) {
    return router.createUrlTree(['/result']);
  }

  if (service.allStages().length === 0) {
    return router.createUrlTree(['/']);
  }

  return true;
};
