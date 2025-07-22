import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedcoursComponent } from './savedcours.component';

describe('SavedcoursComponent', () => {
  let component: SavedcoursComponent;
  let fixture: ComponentFixture<SavedcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedcoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
