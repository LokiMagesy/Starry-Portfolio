import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from "../components/card/card.component";
import { MatCardModule } from '@angular/material/card';
import { CopyemailbuttonComponent } from "../components/copyEmail/copyEmailButton.component";
import { GlobeComponent } from "../components/globe/globe.component";
import { FrameworkComponent } from "../components/frame-orbit/framework.component";

@Component({
selector: 'about-component',
templateUrl: './about.component.html',
styleUrls: ['./about.component.css'],
imports: [CardComponent, MatCardModule, CopyemailbuttonComponent, GlobeComponent, FrameworkComponent]
})
export class AboutComponent implements OnInit {
@ViewChild('grid2Container')
grid2Container!: ElementRef<HTMLElement>;

constructor() {
}

ngOnInit(){

}
}