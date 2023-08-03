import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodStandingForeignVerificationComponent } from './good-standing-foreign-verification.component';

describe('GoodStandingForeignVerificationComponent', () => {
  let component: GoodStandingForeignVerificationComponent;
  let fixture: ComponentFixture<GoodStandingForeignVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodStandingForeignVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodStandingForeignVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
