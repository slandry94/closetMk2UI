import { TestBed, inject } from '@angular/core/testing';

import { UserLandingService } from './user-landing.service';

describe('UserLandingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLandingService]
    });
  });

  it('should be created', inject([UserLandingService], (service: UserLandingService) => {
    expect(service).toBeTruthy();
  }));
});
