import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviedbComponent } from './moviedb.component';

describe('MoviedbComponent', () => {
  let component: MoviedbComponent;
  let fixture: ComponentFixture<MoviedbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviedbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviedbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
