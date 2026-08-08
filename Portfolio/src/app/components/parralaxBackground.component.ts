import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
selector: 'parralaxBackground-component',
templateUrl: './parralaxBackground.component.html',
styleUrls: ['./parralaxBackground.component.css']
})
export class ParralaxbackgroundComponent implements OnInit {
mountain3Y: string = '0%';
  planetsX: string = '0%';
  mountain2Y: string = '0%';
  mountain1Y: string = '0%';

  ngOnInit(): void {
    this.calculateParallax();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.calculateParallax();
  }

  private calculateParallax(): void {
    const scrollPosition = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    const progress = maxScroll > 0 ? Math.min(Math.max(scrollPosition / maxScroll, 0), 1) : 0;
    const normalizedProgress = Math.min(progress / 0.5, 1);

    this.mountain3Y = `${normalizedProgress * 70}%`;
    this.planetsX = `-${normalizedProgress * 20}%`;
    this.mountain2Y = `${normalizedProgress * 30}%`;
    this.mountain1Y = '0%';
  }
}