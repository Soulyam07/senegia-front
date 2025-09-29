import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashJobseekerComponent } from './dash-jobseeker.component';

describe('DashJobseekerComponent', () => {
  let component: DashJobseekerComponent;
  let fixture: ComponentFixture<DashJobseekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashJobseekerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashJobseekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
