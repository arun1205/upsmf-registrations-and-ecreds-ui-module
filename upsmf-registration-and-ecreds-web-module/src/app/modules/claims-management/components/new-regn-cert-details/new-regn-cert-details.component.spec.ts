import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegnCertDetailsComponent } from './new-regn-cert-details.component';

describe('NewRegnCertDetailsComponent', () => {
  let component: NewRegnCertDetailsComponent;
  let fixture: ComponentFixture<NewRegnCertDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRegnCertDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRegnCertDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
