import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegnDiplomaCertDetailsComponent } from './regn-diploma-cert-details.component';

describe('RegnDiplomaCertDetailsComponent', () => {
  let component: RegnDiplomaCertDetailsComponent;
  let fixture: ComponentFixture<RegnDiplomaCertDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegnDiplomaCertDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegnDiplomaCertDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
