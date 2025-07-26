import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrailerComponent } from './trailer/trailer.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { RecommendationEngineComponent } from './recommendation-engine/recommendation-engine.component';
import { provideHttpClient } from '@angular/common/http';
import { SavedMoviesComponent } from './saved-movies/saved-movies.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'trailer', component: TrailerComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'recommendation', component: RecommendationEngineComponent }, 
  { path: 'saved-movies', component: SavedMoviesComponent},
  { path: '**', redirectTo: 'home' },
];

export const APP_PROVIDERS = [
  provideHttpClient()
];

















