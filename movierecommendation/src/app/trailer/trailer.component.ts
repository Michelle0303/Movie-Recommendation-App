import { Component } from '@angular/core';
import { TrailerService } from './trailer.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trailer',
  standalone: true,
  imports: [
    FormsModule, 
    HttpClientModule, 
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule 
  ],
  providers: [TrailerService],
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css']
})
export class TrailerComponent {
  trailers: any[] = [];  // YouTube search results
  savedTrailers: any[] = [];  // Saved trailers from backend
  trailerExists = false;

  constructor(private trailerService: TrailerService) {
    this.loadSavedTrailers();  // Load saved trailers on component initialization
  }

  // Search for YouTube trailers
  searchTrailers(query: string): void {
    this.trailerService.searchTrailers(query).subscribe((response) => {
      this.trailers = response.items;
      console.log(this.trailers);
    });
  }

  // Add trailer link to backend and update saved trailers
  addTrailer(movieId: string, trailerLink: string): void {
    this.trailerService.addTrailerLink(movieId, trailerLink).subscribe(() => {
      alert('Trailer link added successfully');
      this.loadSavedTrailers();  // Reload saved trailers after adding
    });
  }

  // Load saved trailers from backend
  loadSavedTrailers(): void {
    this.trailerService.getTrailers().subscribe((trailers) => {
      this.savedTrailers = trailers;
    });
  }

  // Edit a saved trailer
  editTrailer(trailer: any): void {
    // Fill form with selected trailer data to update
    this.trailerExists = true;
    // Set movieId and trailerLink with the trailer's current values for editing
    // (Implement form controls to update based on these values)
  }

  // Delete a saved trailer
  deleteTrailer(trailerId: string): void {
    this.trailerService.deleteTrailerLink(trailerId).subscribe(() => {
      alert('Trailer deleted successfully');
      this.loadSavedTrailers();  // Reload saved trailers after deletion
    });
  }
}
