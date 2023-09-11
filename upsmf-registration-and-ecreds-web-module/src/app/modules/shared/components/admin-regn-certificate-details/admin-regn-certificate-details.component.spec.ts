import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegnCertificateDetailsComponent } from './admin-regn-certificate-details.component';

describe('AdminRegnCertificateDetailsComponent', () => {
  let component: AdminRegnCertificateDetailsComponent;
  let fixture: ComponentFixture<AdminRegnCertificateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegnCertificateDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRegnCertificateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
