import { TestBed } from '@angular/core/testing';

import { PythonTestService } from './python-test.service';

describe('PythonTestService', () => {
  let service: PythonTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PythonTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
