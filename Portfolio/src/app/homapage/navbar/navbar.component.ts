import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
selector: 'navbar-component',
templateUrl: './navbar.component.html',
imports: [MatIconModule, MatMenuModule, RouterLink],
styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

constructor() {
}

ngOnInit(){

}
isMenuOpen = false;
  items = [
    {
      routeLink: '/dashboard',
      icon: 'home',
      label: 'Dashboard',
    },
    {
      routeLink: '/about',
      icon: 'person_pin',
      label: 'about',
    },
    {
      routeLink: '/work',
      icon: 'work',
      label: 'work',
    },
    {
      routeLink: 'contact',
      icon: 'contacts',
      label: 'contacts',
    },
  ];
}