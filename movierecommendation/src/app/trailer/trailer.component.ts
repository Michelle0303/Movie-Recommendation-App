import { Component, OnInit } from '@angular/core';
import { TrailerService } from './trailer.service';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavigationMenuComponent } from '../navigation-menu/navigation-menu.component';



@Component({
  selector: 'app-trailer',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    NavigationMenuComponent,
    
  ],
  providers: [TrailerService],
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css']
})
export class TrailerComponent implements OnInit {
  trailers: any[] = [];
  savedTrailers: any[] = [];
  trailerExists = false;
  editingTrailer: any = null;
  searchQuery: string = '';

  constructor(private trailerService: TrailerService) {}
  ngOnInit(): void {this.loadSavedTrailers();}

  // Search for YouTube trailers
  searchTrailers(query: string): void {
    if (!query.trim()) {
      this.trailers = [];
      this.trailerExists = false; 
      return;
    }
  
    // Call to YouTube API
    this.trailerService.searchTrailers(query).subscribe((response) => { 
      this.trailers = response.items || []; 
      this.trailerExists = this.trailers.length > 0; 
      },
      (error) => {
        console.error('Error fetching trailers:', error);
        this.trailers = [];
        this.trailerExists = false; 
      }
    );
  }

  // Adds trailer link to backend and update saved trailers
  addTrailer(trailer: any): void {
    const trailerData = {
      movie_Name: trailer.snippet.title,
      genres: 'Unknown',
      Year: 'Unknown',
      author: trailer.snippet.channelTitle,
      Ratings: 'N/A',
      reviews: 'N/A',
      trailerLink: `https://www.youtube.com/watch?v=${trailer.id.videoId}`,
    };

    this.trailerService.addTrailerLink(trailerData).subscribe(() => {
      alert('Trailer link added successfully');
      this.loadSavedTrailers();
    });
  }

  // Load saved trailers from backend
  loadSavedTrailers(): void {
    this.trailerService.getTrailers().subscribe((trailers) => {
      this.savedTrailers = trailers;
      //console.log("Updated saved trailers from backend:", this.savedTrailers); //for checking purposes
    });
  }
}
