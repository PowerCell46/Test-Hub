import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceTestComponent } from './submit-multiple-choice-test.component';

describe('MultipleChoiceTestComponent', () => {
  let component: MultipleChoiceTestComponent;
  let fixture: ComponentFixture<MultipleChoiceTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultipleChoiceTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultipleChoiceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
