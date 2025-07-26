import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  private apiKey = 'f9a97b8def4784a501adfb350943b8ca'; 
  private baseUrl = 'https://api.themoviedb.org/3';
  private imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);

  }

  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }

  getRecommendationsByPreferences(
    genre: number | null,
    director: number | null,
    yearFilter: string
  ): Observable<any[]> {
    let genreParam = genre ? `&with_genres=${genre}` : '';
    let directorParam = director ? `&with_crew=${director}` : '';
    const url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}${genreParam}${directorParam}${yearFilter}`;
    
    console.log('Request URL:', url); 
    return this.http.get<any[]>(url);
  }
  
}