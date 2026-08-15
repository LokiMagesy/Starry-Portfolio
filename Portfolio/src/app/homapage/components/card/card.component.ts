import { Component, Input, OnInit } from '@angular/core';

@Component({
selector: 'card-component',
templateUrl: './card.component.html',
styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() style: { [klass: string]: any } = {};
  @Input() text?: string;
  @Input() image?: string;
  
  // Accepts the ViewChild ElementRef or raw HTMLElement from the parent
  @Input() containerRef: any;
constructor() {
}

ngOnInit(){

}
}