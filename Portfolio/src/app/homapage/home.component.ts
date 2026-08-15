import { Component, OnInit } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { AboutComponent } from "./about/about.component";
import { ProjectsComponent } from "./projectsListing/projects.component";

@Component({
selector: 'home-component',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css'],
imports: [HeroComponent, AboutComponent, ProjectsComponent]
})
export class HomeComponent implements OnInit {

constructor() {
}

ngOnInit(){

}
}