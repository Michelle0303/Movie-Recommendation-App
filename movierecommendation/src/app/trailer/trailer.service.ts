import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrailerService {
  private apiKey = 'AIzaSyCXterhdrsNBlGjCxxTPBAuTRjNyeQxV94'; // YouTube API key
  private apiUrl = 'https://www.googleapis.com/youtube/v3/search'; // YouTube API URL
  private backendUrl = 'http://localhost:8000/api/trailers'; // Express backend URL

  constructor(private http: HttpClient) {}

  // Fetch trailers from YouTube
  searchTrailers(query: string): Observable<any> {
    const url = `${this.apiUrl}?part=snippet&type=video&q=${query} trailer&key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  // Add a new trailer link
  addTrailerLink(trailerData: any): Observable<any> {
    return this.http.post(this.backendUrl, trailerData);
  }

  // Get all trailers
  getTrailers(): Observable<any> {
    return this.http.get<any>(this.backendUrl);
  }

  // Update a trailer by ID
  updateTrailerLink(trailerId: string, trailerData: any): Observable<any> {
    return this.http.put(`${this.backendUrl}/${trailerId}`, trailerData);
  }

  // Delete a trailer by ID
  deleteTrailerLink(trailerId: string): Observable<any> {
    return this.http.delete(`${this.backendUrl}/${trailerId}`);
  }

  getTrailerByMovieName(movieName: string) {
    return this.http.get(`/api/trailers?movie_Name=${movieName}`); // Optional if needed
  }
  
  updateTrailerReview(trailerId: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.backendUrl}/${trailerId}`, updatedData);
  }

}
