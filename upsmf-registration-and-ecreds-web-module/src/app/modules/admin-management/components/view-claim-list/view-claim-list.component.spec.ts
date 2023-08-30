import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClaimListComponent } from './view-claim-list.component';

describe('ViewClaimListComponent', () => {
  let component: ViewClaimListComponent;
  let fixture: ComponentFixture<ViewClaimListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClaimListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClaimListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
