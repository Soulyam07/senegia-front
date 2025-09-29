import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsJobseekerComponent } from './details-jobseeker.component';

describe('DetailsJobseekerComponent', () => {
  let component: DetailsJobseekerComponent;
  let fixture: ComponentFixture<DetailsJobseekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsJobseekerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsJobseekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
