import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavigationMenuComponent } from '../navigation-menu/navigation-menu.component';
import { RecommendationService } from './recommendation.service';

interface Movie {
  id: number;
  title: string;
  genre: number[];
  release_year: number;
  poster_path: string;
  directors: string[];
}

@Component({
  selector: 'app-recommendation-engine',
  standalone: true,
  templateUrl: './recommendation-engine.component.html',
  styleUrls: ['./recommendation-engine.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    NavigationMenuComponent,
  ],
})
export class RecommendationEngineComponent implements OnInit {
  genres = [
    { id: 28, name: 'Action' },
    { id: 18, name: 'Drama' },
    { id: 35, name: 'Comedy' },
    { id: 27, name: 'Horror' },
    { id: 10749, name: 'Romance' },
    { id: 12, name: 'Adventure' },
    { id: 53, name: 'Thriller' },
    { id: 878, name: 'Science Fiction' },
    { id: 10751, name: 'Family' },
    { id: 16, name: 'Animation' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 10402, name: 'Music' },
    { id: 14, name: 'Fantasy' },
  ];
  
  directors = [
    { id: 190, name: 'Clint Eastwood' },
    { id: 525, name: 'Christopher Nolan' },
    { id: 1032, name: 'Martin Scorsese' },
    { id: 138, name: 'Quentin Tarantino' },
    { id: 5281, name: 'Spike Lee' },
    { id: 45400, name: 'Greta Gerwig' },
    { id: 488, name: 'Steven Spielberg' },
    { id: 578, name: 'Ridley Scott' },
    { id: 597, name: 'James Cameron' },
    { id: 2636, name: 'Alfred Hitchcock' },
    { id: 240, name: 'Stanley Kubrick' },
    { id: 15218, name: 'James Gunn' },
  ];
  
  filteredDirectors: any[] = [];
  userPreferences = { genre: null, director: null as number | null, startYear: null, endYear: null };

  recommendations: Movie[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;

  paginatedMovies: Movie[] = [];
  yearList: number[] = Array.from({ length: 102 }, (_, i) => 2026 - i).concat([2024, 2025, 2026]);

  isPreferencesSaved: boolean = false;
  isInvalidYearRange: boolean = false;

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit(): void {
    this.filteredDirectors = [...this.directors];
  }

  savePreferences(): void {
    if (
      this.userPreferences.startYear &&
      this.userPreferences.endYear &&
      this.userPreferences.endYear < this.userPreferences.startYear
    ) {
      this.isInvalidYearRange = true;
      return;
    }
    this.isInvalidYearRange = false;
    this.fetchRecommendations();
    this.isPreferencesSaved = true;
  }

  updatePreferences(): void {
    if (this.isPreferencesSaved) {
      this.fetchRecommendations();
    }
  }

  fetchRecommendations(): void {
    const genre = this.userPreferences.genre ? +this.userPreferences.genre : null;
    const director = this.userPreferences.director ? +this.userPreferences.director : null;
    const yearFilter = this.userPreferences.startYear
      ? `&primary_release_date.gte=${this.userPreferences.startYear}-01-01&primary_release_date.lte=${this.userPreferences.endYear}-12-31`
      : '';
    if (genre === null) {
      console.warn('User selected "Any Genre". Fetching all genres.');
    }

    this.recommendationService.getRecommendationsByPreferences(genre, director, yearFilter).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        this.recommendations = response.results.map((movie: any) => ({
          ...movie,
          genre: movie.genre_ids || movie.genres.map((g: any) => g.id),
          release_year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown',
          directors: [],
        }));
        this.fetchDirectorsForMovies(); 
        this.currentPage = 1;
        this.paginateMovies();
      },
      error: (err) => {
        console.error('Error fetching recommendations:', err);
      },
    });
  }

  fetchDirectorsForMovies(): void {
    this.recommendations.forEach((movie) => {
      this.recommendationService.getMovieCredits(movie.id).subscribe({
        next: (credits: any) => {

          const directors = credits.crew.filter((crewMember: any) => crewMember.job === 'Director');
          movie.directors = directors.map((director: any) => director.name) || ['Unknown'];
        },
        error: () => {
          movie.directors = ['Unknown'];  // Set a default if no directors are found
        },
      });
    });
  }

  deleteRecommendations(): void {
    this.userPreferences = { genre: null, director: null, startYear: null, endYear: null };
    this.isPreferencesSaved = false;
    this.isInvalidYearRange = false;
  
    this.recommendations = [];
    this.paginatedMovies = [];
    this.currentPage = 1;
  }

  paginateMovies(): void {
    this.totalPages = Math.ceil(this.recommendations.length / this.itemsPerPage);
    this.paginatedMovies = this.recommendations.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateMovies();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateMovies();
    }
  }

  getDirectorName(directorId: string | number): string {
    if (!directorId) return 'Any Director';
  
    const director = this.filteredDirectors.find(d => d.id === directorId);
    return director ? director.name : ''; 
  }

  getGenreName(genreId: number): string {
    const genre = this.genres.find((g) => g.id === genreId);
    if (!genre) {
      console.warn(`Genre ID ${genreId} not found in the genres array.`);
    }
    return genre ? genre.name : 'Unknown Genre';
  }

  isYearDisabled(year: number): boolean {
    const currentYear = new Date().getFullYear();
    return (
      this.userPreferences.startYear !== null &&
      (year < this.userPreferences.startYear || year > currentYear + 2)
    );
  }
}
