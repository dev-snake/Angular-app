import { TestBed } from '@angular/core/testing';

import { ManageProductService } from './manage-product.service';

describe('ManageProductService', () => {
  let service: ManageProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
