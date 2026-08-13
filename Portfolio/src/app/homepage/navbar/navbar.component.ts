import { Component, OnInit } from '@angular/core';

@Component({
selector: 'navbar-component',
templateUrl: './navbar.component.html',
styleUrls: ['./navbar.component.css'],
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