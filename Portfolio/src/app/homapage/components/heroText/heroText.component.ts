import { Component, OnInit } from '@angular/core';
import { FlipWordsComponent } from "../flipsWords/FlipWords.compoment";

@Component({
selector: 'heroText-component',
templateUrl: './heroText.component.html',
styleUrls: ['./heroText.component.css'],
imports: [FlipWordsComponent]
})
export class HerotextComponent implements OnInit {
words: string[] = ['Secure', 'Modern', 'Scalable'];
constructor() {
}

ngOnInit(){

}
}