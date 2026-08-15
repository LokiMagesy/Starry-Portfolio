import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-flip-words',
  standalone: true,

  template: `
    <div class="flip-words-container">

      @if (currentWord) {
        <div
          class="flip-words-current"
          animate.enter="word-enter"
          animate.leave="word-leave"
        >
          @for (
            word of currentWord.split(' ');
            track $index;
            let wordIndex = $index
          ) {
            <span
              class="flip-words-word"
              animate.enter="letter-enter"
              [style.--delay]="(wordIndex * 300) + 'ms'"
            >
              @for (
                letter of word.split('');
                track $index;
                let letterIndex = $index
              ) {
                <span
                  class="flip-words-letter"
                  animate.enter="letter-enter"
                  [style.--delay]="
                    (wordIndex * 300 + letterIndex * 50) + 'ms'
                  "
                >
                  {{ letter }}
                </span>
              }
            </span>
          }
        </div>
      }

    </div>
  `,

  styles: [`
    .flip-words-container {
      position: relative;
      z-index: 10;
      display: inline-block;
      text-align: left;
    }

    .flip-words-current {
      position: relative;
      display: inline-block;
    }

    .flip-words-word {
      display: inline-block;
      white-space: nowrap;
    }

    .flip-words-letter {
      display: inline-block;
    }

    /*
     * ----------------------------------------
     * WORD ENTER
     * ----------------------------------------
     *
     * Replaces:
     *
     * trigger('wordAnimation', [
     *   transition(':enter', ...)
     * ])
     */
    .word-enter {
      animation:
        word-enter 500ms
        cubic-bezier(0.34, 1.56, 0.64, 1)
        both;
    }

    @keyframes word-enter {
      from {
        opacity: 0;
        transform: translateY(10px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /*
     * ----------------------------------------
     * WORD LEAVE
     * ----------------------------------------
     */
    .word-leave {
      position: absolute;
      animation:
        word-leave 400ms
        ease-in-out
        both;
    }

    @keyframes word-leave {
      from {
        opacity: 1;
        transform: translate(0, 0) scale(1);
        filter: blur(0);
      }

      to {
        opacity: 0;
        transform: translate(40px, -40px) scale(2);
        filter: blur(8px);
      }
    }

    /*
     * ----------------------------------------
     * LETTER ENTER
     * ----------------------------------------
     *
     * --delay is supplied from the template.
     */
    .letter-enter {
      animation:
        letter-enter 200ms
        var(--delay, 0ms)
        ease-out
        both;
    }

    @keyframes letter-enter {
      from {
        opacity: 0;
        transform: translateY(60px);
        filter: blur(10px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
      }
    }
  `]
})
export class FlipWordsComponent implements OnInit, OnDestroy {
  private readonly DEFAULT_DURATION = 3000;

  @Input() words: string[] = [];
  @Input() duration = this.DEFAULT_DURATION;

  currentWord = '';

  private currentIndex = 0;
  private timer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    if (this.words.length === 0) {
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