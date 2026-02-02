import { CanActivateFn } from '@angular/router';
import { CaptchaService } from '../services/captcha.service';
import { inject } from '@angular/core';

export const completionGuard: CanActivateFn = (route, state) => {
    const captchaService = inject(CaptchaService);
    if (!captchaService.isFinished()) {
        return false;
    }
  return true;
};
