import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterJobComponent } from './register-job.component';

describe('RegisterJobComponent', () => {
  let component: RegisterJobComponent;
  let fixture: ComponentFixture<RegisterJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
