import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPrincipComponent } from './dash-princip.component';

describe('DashPrincipComponent', () => {
  let component: DashPrincipComponent;
  let fixture: ComponentFixture<DashPrincipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashPrincipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashPrincipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
