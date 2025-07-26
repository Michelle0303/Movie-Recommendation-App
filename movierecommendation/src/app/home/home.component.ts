import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { NavigationMenuComponent } from '../navigation-menu/navigation-menu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavigationMenuComponent,RouterModule],  // Add CommonModule here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  
})
export class HomeComponent {
  featuredMovies = [
    {
      name: 'Inception',
      genre: 'Sci-Fi',
      year: 2010,
      image: 'https://th.bing.com/th/id/R.7f7a93fc7c9d654c430587099f3a5dcc?rik=Z98mqx18mKmbAw&pid=ImgRaw&r=0'
    },
    {
      name: 'The Dark Knight',
      genre: 'Action',
      year: 2008,
      image: 'https://th.bing.com/th/id/R.34df6b287faf65b160b47e05ba85bb3b?rik=o5LsP1up4eGlXA&pid=ImgRaw&r=0'
    },
    {
      name: 'Interstellar',
      genre: 'Sci-Fi',
      year: 2014,
      image: 'https://th.bing.com/th/id/R.ba26a3fc831a0bb87736889e02172657?rik=uXyAdlOkXmrwnw&pid=ImgRaw&r=0'
    },
    {
      name: 'Maleficent',
      genre: 'Fairy Tale',
      year: 2014,
      image: 'https://th.bing.com/th/id/OIP.2kV_zj2GOMil266gzLwPKAHaLH?rs=1&pid=ImgDetMain'
    }
  ];
}
