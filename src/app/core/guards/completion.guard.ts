import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CaptchaService } from '../services/captcha.service';

export const completionGuard: CanActivateFn = (route, state) => {
  const service = inject(CaptchaService);
  if (service.isFinished()) {
    return true;
  } else {
    return false;
  }
};
