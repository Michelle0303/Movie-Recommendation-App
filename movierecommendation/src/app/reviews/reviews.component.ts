import { Component, OnInit } from '@angular/core';
import { TrailerService } from '../trailer/trailer.service';
import { NavigationMenuComponent } from '../navigation-menu/navigation-menu.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavigationMenuComponent,
    FormsModule,
  ],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  formName = 'Ratings and Reviews';
  trailers: any[] = [];
  selectedMovie: string = '';
  selectedTrailer: any = null;

  // Temporary variables for binding
  selectedRating: any = null;
  selectedReview: string = '';

  constructor(private trailerService: TrailerService) {}

  ngOnInit(): void {
    // Load trailers
    this.loadTrailers();
  }

  loadTrailers(): void {
    this.trailerService.getTrailers().subscribe({
      next: (trailers) => {
        this.trailers = trailers;
      },
      error: (err) => {
        console.error('Error loading trailers:', err);
      },
    });
  }

  onMovieSelect(): void {
    this.selectedTrailer = this.trailers.find(
      (trailer) => trailer.movie_Name === this.selectedMovie
    );
  
    if (this.selectedTrailer) {
      // Populate Ratings and Reviews
      if (!this.selectedTrailer.Ratings) {
        this.selectedRating = null; // Default to 1 if no rating exists
      } else {
        this.selectedRating = +this.selectedTrailer.Ratings; // Ensure Ratings is a number
      }
  
      this.selectedReview = this.selectedTrailer.reviews || ''; // Default Reviews to an empty string if undefined
    }
  }
  

  onSubmit(): void {
    if (!this.selectedTrailer) {
      alert('Please select a movie to update.');
      return;
    }

    // Prepare updated trailer data
    const updatedTrailer = {
      ...this.selectedTrailer,
      Ratings: this.selectedRating,
      reviews: this.selectedReview,
    };

    this.trailerService.updateTrailerLink(this.selectedTrailer._id, updatedTrailer).subscribe({
      next: () => {
        alert('Review updated successfully!');
        this.loadTrailers(); 
        this.resetForm();
      },
      error: (err) => {
        console.error('Error updating trailer:', err);
      },
    });
  }

  deleteEntry(): void {
    if (!this.selectedTrailer) {
      alert('Please select a movie to delete the review.');
      return;
    }

    const updatedTrailer = {
      ...this.selectedTrailer,
      Ratings: null,
      reviews: '',
    };

    this.trailerService.updateTrailerLink(this.selectedTrailer._id, updatedTrailer).subscribe({
      next: () => {
        alert('Review deleted successfully!');
        this.loadTrailers(); 
        this.resetForm();
      },
      error: (err) => {
        console.error('Error deleting review:', err);
      },
    });
  }

  resetForm(): void {
    this.selectedMovie = '';
    this.selectedTrailer = null;
    this.selectedRating = null;
    this.selectedReview = '';
  }
}
