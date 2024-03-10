import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSingleQuestionComponent } from './result-single-question.component';

describe('ResultSingleQuestionComponent', () => {
  let component: ResultSingleQuestionComponent;
  let fixture: ComponentFixture<ResultSingleQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultSingleQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultSingleQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
