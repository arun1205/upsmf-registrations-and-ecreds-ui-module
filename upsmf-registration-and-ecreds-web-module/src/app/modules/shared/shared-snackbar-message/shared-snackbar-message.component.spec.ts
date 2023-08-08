import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSnackbarMessageComponent } from './shared-snackbar-message.component';

describe('SharedSnackbarMessageComponent', () => {
  let component: SharedSnackbarMessageComponent;
  let fixture: ComponentFixture<SharedSnackbarMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedSnackbarMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedSnackbarMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
