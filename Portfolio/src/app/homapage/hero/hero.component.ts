import { Component, OnInit } from '@angular/core';
import { HerotextComponent } from "../components/heroText/heroText.component";
import { ParralaxbackgroundComponent } from "../components/parralaxBackground/parralaxBackground.component";
import { AstronautComponent } from "../three/astronaut.component";

@Component({
selector: 'hero-component',
templateUrl: './hero.component.html',
styleUrls: ['./hero.component.css'],
imports: [HerotextComponent, ParralaxbackgroundComponent, AstronautComponent]
})
export class HeroComponent implements OnInit {

constructor() {
}

ngOnInit(){

}
}