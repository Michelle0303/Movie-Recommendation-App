import { ComponentFixture, TestBed } from '@angular/core/testing';

import {RecommendationEngineComponent } from './recommendation-engine.component';


describe('RecommendationEngineComponent', () => {
  let component: RecommendationEngineComponent;
  let fixture: ComponentFixture<RecommendationEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendationEngineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendationEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
