import { CanActivateFn } from '@angular/router';

export const completionGuard: CanActivateFn = (route, state) => {
  return true;
};
