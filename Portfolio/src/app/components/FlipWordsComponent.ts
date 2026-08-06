import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

interface ParsedWord {
  id: number;
  text: string;
  wordBlocks: { text: string; letters: string[] }[];
}

@Component({
  selector: 'app-flip-words',
  standalone: true,
  imports: [CommonModule],
  animations: [
    // Container word animation
    trigger('wordAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        style({ position: 'absolute', top: 0, left: 0 }),
        animate('400ms ease-in-out', style({
          opacity: 0,
          transform: 'translate(40px, -40px) scale(2)',
          filter: 'blur(8px)'
        }))
      ])
    ]),

    // Staggered letter animation
    trigger('letterAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)', filter: 'blur(8px)' }),
        animate('200ms {{delay}}ms ease-out', style({ opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)' }))
      ], { params: { delay: 0 } })
    ])
  ],
  styles: [`
    .flip-words-container {
      z-index: 10;
      display: inline-block;
      position: relative;
      text-align: left;
    }

    .flip-words-word {
      display: inline-block;
      white-space: nowrap;
    }

    .flip-words-letter,
    .flip-words-space {
      display: inline-block;
    }
  `],
  template: `
    <!-- Replaced Tailwind with standard CSS class and kept customClass binding -->
    <div [ngClass]="['flip-words-container', customClass]">
      <ng-container *ngFor="let item of [currentParsedWord]; trackBy: trackByItem">
        <div 
          [@wordAnimation] 
          (@wordAnimation.done)="onAnimationDone($event)">
          
          <span 
            *ngFor="let block of item.wordBlocks; let wIndex = index" 
            class="flip-words-word">
            
            <span 
              *ngFor="let letter of block.letters; let lIndex = index"
              class="flip-words-letter"
              [@letterAnimation]="{ value: '', params: { delay: (wIndex * 300) + (lIndex * 50) } }">
              {{ letter }}
            </span>
            <!-- Space separator -->
            <span class="flip-words-space">&nbsp;</span>
          </span>

        </div>
      </ng-container>
    </div>
  `
})
export class FlipWordsComponent implements OnInit, OnDestroy {
  @Input() words: string[] = [];
  @Input() duration: number = 3000;
  @Input() customClass: string = ''; 

  currentParsedWord!: ParsedWord;
  isAnimating: boolean = false;
  
  private timeoutId: any;
  private animationCount = 0; 

  ngOnInit(): void {
    if (this.words && this.words.length > 0) {
      this.setWord(this.words[0]);
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private startTimer(): void {
    this.timeoutId = setTimeout(() => {
      this.startAnimation();
    }, this.duration);
  }

  private startAnimation(): void {
    if (!this.currentParsedWord) return;

    const currentIndex = this.words.indexOf(this.currentParsedWord.text);
    const nextWord = this.words[currentIndex + 1] || this.words[0];
    
    this.setWord(nextWord);
    this.isAnimating = true;
  }

  private setWord(newWord: string): void {
    this.currentParsedWord = {
      id: ++this.animationCount,
      text: newWord,
      wordBlocks: newWord.split(' ').map(w => ({
        text: w,
        letters: w.split('')
      }))
    };
  }

  onAnimationDone(event: any): void {
    if (event.toState === 'void') {
      this.isAnimating = false;
      this.startTimer();
    }
  }

  trackByItem(index: number, item: ParsedWord): number {
    return item.id; 
  }
}