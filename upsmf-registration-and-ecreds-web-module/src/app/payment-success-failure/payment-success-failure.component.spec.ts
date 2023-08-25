import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSuccessFailureComponent } from './payment-success-failure.component';

describe('PaymentSuccessFailureComponent', () => {
  let component: PaymentSuccessFailureComponent;
  let fixture: ComponentFixture<PaymentSuccessFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentSuccessFailureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentSuccessFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
