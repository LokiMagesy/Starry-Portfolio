import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
selector: 'copy-email-button-component',
templateUrl: './copy-email-button.component.html',
styleUrls: ['./copy-email-button.component.css'],
animations: [
    // Replicates the Framer Motion 'copied' state animation
    trigger('slideFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('100ms ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('100ms ease-in-out', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ]),
    // Replicates the Framer Motion 'copy' state animation
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('100ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CopyemailbuttonComponent implements OnInit {

constructor() {
}

ngOnInit(){

}
copied = false;
  email = 'Your Email Address';

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.email).then(() => {
      this.copied = true;
      
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    });
  }
}