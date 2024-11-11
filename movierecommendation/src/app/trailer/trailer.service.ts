// trailer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrailerService {
  private apiKey = 'AIzaSyCXterhdrsNBlGjCxxTPBAuTRjNyeQxV94'; // my YouTube API key
  private apiUrl = 'https://www.googleapis.com/youtube/v3/search'; // YouTube API URL
  private backendUrl = 'http://localhost:8000/api/trailers'; // Express.js backend URL /api/trailers was added to the link for easy access of stored trailer link

  constructor(private http: HttpClient) {}

  // Fetchs trailers from YouTube using YouTube API
  searchTrailers(query: string): Observable<any> {
    const url = `${this.apiUrl}?part=snippet&type=video&q=${query} trailer&key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  // Adds trailer link 
  addTrailerLink(movieId: string, trailerLink: string): Observable<any> {
    return this.http.post(this.backendUrl, { movieId, trailerLink });
  }

  getTrailers(): Observable<any> {
    return this.http.get<any>(this.backendUrl); 
  }

  // Updates trailer link
  updateTrailerLink(movieId: string, newTrailerLink: string): Observable<any> {
    return this.http.put(`${this.backendUrl}/${movieId}`, { newTrailerLink });
  }

  // Deletes a trailer link 
  deleteTrailerLink(movieId: string): Observable<any> {
    return this.http.delete(`${this.backendUrl}/${movieId}`);
  }
}
