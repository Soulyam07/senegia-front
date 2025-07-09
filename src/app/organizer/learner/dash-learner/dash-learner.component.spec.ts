import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLearnerComponent } from './dash-learner.component';

describe('DashLearnerComponent', () => {
  let component: DashLearnerComponent;
  let fixture: ComponentFixture<DashLearnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashLearnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
