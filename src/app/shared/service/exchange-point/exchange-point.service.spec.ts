import { TestBed } from '@angular/core/testing';

import { ExchangePointService } from './exchange-point.service';

describe('ExchangePointService', () => {
  let service: ExchangePointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangePointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
