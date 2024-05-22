import { TestBed } from '@angular/core/testing';

import { PageProductService } from './page-product.service';

describe('PageProductService', () => {
  let service: PageProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
