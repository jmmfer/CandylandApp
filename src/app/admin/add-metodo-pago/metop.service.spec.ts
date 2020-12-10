import { TestBed } from '@angular/core/testing';

import { MetopService } from './metop.service';

describe('MetopService', () => {
  let service: MetopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
