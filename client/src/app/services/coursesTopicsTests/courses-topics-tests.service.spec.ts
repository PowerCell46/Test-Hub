import { TestBed } from '@angular/core/testing';

import { CoursesTopicsTestsService } from './courses-topics-tests.service';

describe('CoursesTopicsTestsService', () => {
  let service: CoursesTopicsTestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesTopicsTestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
