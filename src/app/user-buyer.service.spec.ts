import { TestBed, inject } from '@angular/core/testing';

import { UserBuyersService } from './user-buyer.service';

describe('UserBuyerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserBuyersService]
    });
  });

  it('should be created', inject([UserBuyersService], (service: UserBuyersService) => {
    expect(service).toBeTruthy();
  }));
});
