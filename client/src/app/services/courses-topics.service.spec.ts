import { TestBed } from '@angular/core/testing';

import { CoursesTopicsService } from './courses-topics.service';

describe('CoursesTopicsService', () => {
  let service: CoursesTopicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesTopicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
