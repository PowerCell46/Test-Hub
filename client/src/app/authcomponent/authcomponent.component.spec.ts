import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthcomponentComponent } from './authcomponent.component';

describe('AuthcomponentComponent', () => {
  let component: AuthcomponentComponent;
  let fixture: ComponentFixture<AuthcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthcomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
