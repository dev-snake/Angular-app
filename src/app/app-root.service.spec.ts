import { TestBed } from '@angular/core/testing';

import { AppRootService } from './app-root.service';

describe('AppRootService', () => {
  let service: AppRootService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppRootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
