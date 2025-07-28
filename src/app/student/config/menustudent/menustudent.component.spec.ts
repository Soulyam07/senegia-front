import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenustudentComponent } from './menustudent.component';

describe('MenustudentComponent', () => {
  let component: MenustudentComponent;
  let fixture: ComponentFixture<MenustudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenustudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenustudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
