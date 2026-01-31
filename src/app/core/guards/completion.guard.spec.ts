import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { completionGuard } from './completion.guard';

describe('completionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => completionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
