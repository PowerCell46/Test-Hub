import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultMultipleChoiceTestComponent } from './result-multiple-choice-test.component';

describe('ResultMultipleChoiceTestComponent', () => {
  let component: ResultMultipleChoiceTestComponent;
  let fixture: ComponentFixture<ResultMultipleChoiceTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultMultipleChoiceTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultMultipleChoiceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
