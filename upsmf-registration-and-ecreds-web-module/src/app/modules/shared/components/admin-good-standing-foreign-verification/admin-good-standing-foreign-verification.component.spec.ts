import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodStandingForeignVerificationComponent } from './admin-good-standing-foreign-verification.component';

describe('AdminGoodStandingForeignVerificationComponent', () => {
  let component: AdminGoodStandingForeignVerificationComponent;
  let fixture: ComponentFixture<AdminGoodStandingForeignVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodStandingForeignVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGoodStandingForeignVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
