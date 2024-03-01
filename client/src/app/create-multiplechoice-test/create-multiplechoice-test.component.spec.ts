import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMultiplechoiceTestComponent } from './create-multiplechoice-test.component';

describe('CreateMultiplechoiceTestComponent', () => {
  let component: CreateMultiplechoiceTestComponent;
  let fixture: ComponentFixture<CreateMultiplechoiceTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMultiplechoiceTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMultiplechoiceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
