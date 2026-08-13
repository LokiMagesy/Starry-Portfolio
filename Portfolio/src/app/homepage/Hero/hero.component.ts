import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";

@Component({
selector: 'hero-component',
templateUrl: './hero.component.html',
styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, AfterViewInit {

constructor() {
}
    ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }

ngOnInit(){

}
}