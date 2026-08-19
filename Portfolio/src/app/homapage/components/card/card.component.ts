import { CdkDrag, CdkDragEnd, CdkDragMove, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, ElementRef, input, Input } from '@angular/core';

@Component({
selector: 'card-component',
templateUrl: './card.component.html',
  standalone: true,
  imports: [
    CdkDrag,
    DragDropModule
  ],
styleUrls: ['./card.component.css']
})
export class CardComponent {
  style = input<Record<string, string>>({});

  text = input<string>();

  image = input<string>();

   containerRef = input.required<HTMLElement>();

  isDragging = false;
private resetTimer?: ReturnType<typeof setTimeout>;

onDragStarted(): void {
  this.isDragging = true;

  if (this.resetTimer) {
    clearTimeout(this.resetTimer);
  }
}

  onDragEnded(event: CdkDragEnd): void {
    this.isDragging = false;
        setTimeout(() => {
      event.source.reset();
    }, 3000);
  }
}