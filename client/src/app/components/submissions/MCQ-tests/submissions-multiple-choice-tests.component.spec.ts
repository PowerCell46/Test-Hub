import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionsMultipleChoiceTestsComponent } from './submissions-multiple-choice-tests.component';

describe('SubmissionsMultipleChoiceTestsComponent', () => {
  let component: SubmissionsMultipleChoiceTestsComponent;
  let fixture: ComponentFixture<SubmissionsMultipleChoiceTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmissionsMultipleChoiceTestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmissionsMultipleChoiceTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
