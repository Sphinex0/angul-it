import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CaptchaService } from '../services/captcha.service';

export const completionGuard: CanActivateFn = () => {
  const service = inject(CaptchaService);
  return service.isFinished();
};
