import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { FlipWordsComponent } from './FlipWordsComponent'; // Adjust path if needed

@Component({
  selector: 'app-hero-text',
  standalone: true,
  imports: [CommonModule, FlipWordsComponent],
  animations: [
    // Replicates the Framer Motion "hidden" to "visible" variant
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        // The delay is passed dynamically from the template parameters
        animate('800ms {{delay}}ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ], { params: { delay: 0 } })
    ])
  ],
  templateUrl: './hero-text.component.html',
  styleUrls: ['./HeroText.component.css']
})
export class HeroTextComponent {
  words: string[] = ['Secure', 'Modern', 'Scalable'];
}