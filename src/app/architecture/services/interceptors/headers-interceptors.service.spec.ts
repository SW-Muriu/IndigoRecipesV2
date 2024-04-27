import { TestBed } from '@angular/core/testing';

import { HeadersInterceptorsService } from './headers-interceptors.service';

describe('HeadersInterceptorsService', () => {
  let service: HeadersInterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadersInterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
