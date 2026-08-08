import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
selector: 'about-component',
templateUrl: './about.component.html',
styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
@ViewChild('grid2Container') grid2Container!: ElementRef;
constructor() {
}

ngOnInit(){

}
}