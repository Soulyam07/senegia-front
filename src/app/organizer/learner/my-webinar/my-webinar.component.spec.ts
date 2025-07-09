import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWebinarComponent } from './my-webinar.component';

describe('MyWebinarComponent', () => {
  let component: MyWebinarComponent;
  let fixture: ComponentFixture<MyWebinarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyWebinarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyWebinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
