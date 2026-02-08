import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { inProgressGuard } from './in-progress.guard';

describe('inProgressGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => inProgressGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
