import { TestBed } from '@angular/core/testing';

import { MultipleChoiceTestService } from './multiple-choice-test.service';

describe('MultipleChoiceTestService', () => {
  let service: MultipleChoiceTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultipleChoiceTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
