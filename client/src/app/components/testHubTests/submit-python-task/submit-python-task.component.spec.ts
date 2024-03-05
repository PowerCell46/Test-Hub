import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitPythonTaskComponent } from './submit-python-task.component';

describe('SubmitPythonTaskComponent', () => {
  let component: SubmitPythonTaskComponent;
  let fixture: ComponentFixture<SubmitPythonTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmitPythonTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitPythonTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
