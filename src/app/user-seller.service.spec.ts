import { TestBed, inject } from '@angular/core/testing';

import { UserSellersService } from './user-seller.service';

describe('UserSellerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserSellersService]
    });
  });
  it('should be created', inject([UserSellersService], (service: UserSellersService) => {
    expect(service).toBeTruthy();
  }));
});
