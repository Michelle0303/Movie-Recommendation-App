import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrailerService } from '../trailer/trailer.service';
import { NavigationMenuComponent } from '../navigation-menu/navigation-menu.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-saved-movies',
  standalone: true,
  imports: [
    FormsModule,
    NavigationMenuComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './saved-movies.component.html',
  styleUrls: ['./saved-movies.component.css'],
})
export class SavedMoviesComponent implements OnInit {
  savedTrailers: any[] = [];
  editingTrailer: any = null;
  yearsList: number[] = [];

  constructor(private trailerService: TrailerService) {}

  ngOnInit(): void {
    this.loadSavedTrailers();
    this.generateYearsList();
  }

  // Load saved trailers from the backend
  loadSavedTrailers(): void {
    this.trailerService.getTrailers().subscribe(
      (trailers) => {
        this.savedTrailers = trailers.sort((a: any, b: any) =>
          a.movie_Name.localeCompare(b.movie_Name)
        );
      },
      (error) => console.error('Error loading trailers:', error)
    );
  }

  // Generate a list of years from 1900 to the current year
  generateYearsList(): void {
    const currentYear = new Date().getFullYear();
    this.yearsList = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);
  }

  // Enables edit 
  editTrailer(trailer: any): void {
    this.editingTrailer = { ...trailer };
    if (!this.editingTrailer.Ratings) {
      this.editingTrailer.Ratings = 1;  
    } else {
      this.editingTrailer.Ratings = +this.editingTrailer.Ratings;
    }


    this.editingTrailer.Reviews = trailer.reviews || ''; 
  }

  // Cancels edit mode
  cancelEdit(): void {
    this.editingTrailer = null;
  }

  // Saves the updated trailer
  saveTrailer(trailer: any): void {
    const updatedTrailerData = {
      movie_Name: trailer.movie_Name,
      genres: trailer.genres,
      Year: trailer.Year,
      author: trailer.author,
      Ratings: trailer.Ratings,
      reviews: trailer.Reviews, 
      trailerLink: trailer.trailerLink,
    };

    this.trailerService.updateTrailerLink(trailer._id, updatedTrailerData).subscribe(
      () => {
        alert('Trailer updated successfully');
        this.loadSavedTrailers();
        this.editingTrailer = null;
      },
      (error) => console.error('Error updating trailer:', error)
    );
  }

  // Deletes trailer
  deleteTrailer(trailerId: string): void {
    this.trailerService.deleteTrailerLink(trailerId).subscribe(
      () => {
        alert('Trailer deleted successfully');
        this.loadSavedTrailers();
      },
      (error) => console.error('Error deleting trailer:', error)
    );
  }
}
