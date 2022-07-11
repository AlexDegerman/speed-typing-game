import { TestBed } from '@angular/core/testing';

import { RandomQuoteApiService } from './random-quote-api.service';

describe('RandomQuoteApiService', () => {
  let service: RandomQuoteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomQuoteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
