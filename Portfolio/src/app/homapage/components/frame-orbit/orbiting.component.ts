import { Component, input, OnInit } from '@angular/core';

@Component({
selector: 'orbiting-component',
standalone: true,
templateUrl: './orbiting.component.html',
styleUrls: ['./orbiting.component.css']
})
export class OrbitingComponent {

  icons = input<string[]>([]);

  iconSize = input<number>(30);

  radius = input<number>(50);

  reverse = input<boolean>(false);

  speed = input<number>(1);
}