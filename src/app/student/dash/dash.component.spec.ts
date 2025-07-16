import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashComponentStudent } from './dash.component';

describe('DashComponent', () => {
  let component: DashComponentStudent;
  let fixture: ComponentFixture<DashComponentStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashComponentStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashComponentStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
