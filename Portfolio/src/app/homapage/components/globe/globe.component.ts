import { Component, input, OnInit } from '@angular/core';

@Component({
selector: 'globe-component',
templateUrl: './globe.component.html',
styleUrls: ['./globe.component.css']
})
export class GlobeComponent {
  readonly size = input<number>(320);
  readonly meridians = Array.from({ length: 16 }, (_, i) => i);
  readonly latitudes = Array.from({ length: 9 }, (_, i) => i);
}