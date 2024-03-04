import { TestBed } from '@angular/core/testing';

import { MultipleChoiceExamService } from './multiple-choice-exam.service';

describe('MultipleChoiceExamService', () => {
  let service: MultipleChoiceExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultipleChoiceExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
