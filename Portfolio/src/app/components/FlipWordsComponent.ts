import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-flip-words',
  standalone: true,
  imports: [CommonModule],

  animations: [
    trigger('wordAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(10px)'
        }),
        animate(
          '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          style({
            opacity: 1,
            transform: 'translateY(0)'
          })
        )
      ]),

      transition(':leave', [
        style({
          position: 'absolute'
        }),
        animate(
          '400ms ease-in-out',
          style({
            opacity: 0,
            transform: 'translate(40px, -40px) scale(2)',
            filter: 'blur(8px)'
          })
        )
      ])
    ]),

    trigger('letterAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(60px)',
          filter: 'blur(10px)'
        }),

        animate(
          '200ms {{delay}}ms ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)',
            filter: 'blur(0)'
          })
        )
      ], {
        params: {
          delay: 0
        }
      })
    ])
  ],

  styles: [`
    .flip-words-container {
      position: relative;
      z-index: 10;
      display: inline-block;
      text-align: left;
    }

    .flip-words-word {
      display: inline-block;
      white-space: nowrap;
    }

    .flip-words-letter {
      display: inline-block;
    }
  `],

  template: `
    <div class="flip-words-container">

      <div
        *ngIf="currentWord"
        class="flip-words-current"
        @wordAnimation>

        <span
          *ngFor="
            let word of currentWord.split(' ');
            let wordIndex = index
          "
          class="flip-words-word"
          @letterAnimation
          [@letterAnimation]="{
            value: '',
            params: {
              delay: wordIndex * 300
            }
          }">

          <span
            *ngFor="
              let letter of word.split('');
              let letterIndex = index
            "
            class="flip-words-letter"
            [@letterAnimation]="{
              value: '',
              params: {
                delay: wordIndex * 300 + letterIndex * 50
              }
            }">

            {{ letter }}

          </span>

        </span>

      </div>

    </div>
  `
})
export class FlipWordsComponent implements OnInit, OnDestroy {
  private readonly DEFAULT_DURATION = 3000;

  @Input() words: string[] = [];
  @Input() duration = this.DEFAULT_DURATION;

  currentWord = '';
  isAnimating = false;

  private currentIndex = 0;
  private timer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    if (!this.words.length) {
      return;
    }

    this.currentWord = this.words[0];
    this.startAnimation();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private startAnimation(): void {
    this.clearTimer();

    this.timer = setTimeout(() => {
      this.nextWord();
    }, this.duration);
  }

  private nextWord(): void {
    this.currentIndex =
      (this.currentIndex + 1) % this.words.length;

    this.currentWord = this.words[this.currentIndex];
    this.isAnimating = true;

    this.startAnimation();
  }

  private clearTimer(): void {
    if (!this.timer) {
      return;
    }

    clearTimeout(this.timer);
    this.timer = undefined;
  }
}