import { Component, OnInit } from '@angular/core';

@Component({
selector: 'copyEmailButton-component',
templateUrl: './copyEmailButton.component.html',
styleUrls: ['./copyEmailButton.component.css'],

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