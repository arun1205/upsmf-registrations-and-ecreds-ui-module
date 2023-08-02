import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClaimsMenuComponent } from './new-claims-menu.component';

describe('NewClaimsMenuComponent', () => {
  let component: NewClaimsMenuComponent;
  let fixture: ComponentFixture<NewClaimsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewClaimsMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewClaimsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
