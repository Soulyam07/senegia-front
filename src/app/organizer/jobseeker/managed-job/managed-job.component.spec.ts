import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedJobComponent } from './managed-job.component';

describe('ManagedJobComponent', () => {
  let component: ManagedJobComponent;
  let fixture: ComponentFixture<ManagedJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagedJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
