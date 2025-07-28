import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcripComponent } from './subcrip.component';

describe('SubcripComponent', () => {
  let component: SubcripComponent;
  let fixture: ComponentFixture<SubcripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
