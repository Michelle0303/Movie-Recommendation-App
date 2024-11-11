import { Component } from '@angular/core';
import { NavigationMenuComponent } from '../navigation-menu/navigation-menu.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavigationMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
