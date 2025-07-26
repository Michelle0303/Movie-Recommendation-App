import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedMoviesComponent } from './saved-movies.component';

describe('SavedMoviesComponent', () => {
  let component: SavedMoviesComponent;
  let fixture: ComponentFixture<SavedMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
