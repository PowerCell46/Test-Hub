import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonTestsComponent } from './python-tests.component';

describe('PythonTestsComponent', () => {
  let component: PythonTestsComponent;
  let fixture: ComponentFixture<PythonTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PythonTestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PythonTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
