import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrailerComponent } from './trailer/trailer.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { RecommendationEngineComponent } from './recommendation-engine/recommendation-engine.component';
import { MoviedbComponent } from './moviedb/moviedb.component';
import { provideHttpClient } from '@angular/common/http';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trailer', component: TrailerComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'recommendation', component: RecommendationEngineComponent },
  { path: 'moviedb', component: MoviedbComponent },
  { path: '**', redirectTo: '' },
];

export const APP_PROVIDERS = [
  provideHttpClient()
];
