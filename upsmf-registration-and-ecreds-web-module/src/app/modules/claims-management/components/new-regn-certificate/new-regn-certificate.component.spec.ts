import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegnCertificateComponent } from './new-regn-certificate.component';

describe('NewRegnCertificateComponent', () => {
  let component: NewRegnCertificateComponent;
  let fixture: ComponentFixture<NewRegnCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRegnCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRegnCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
