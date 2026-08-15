import { Component, Input, OnInit } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';

@Component({
selector: 'project-component',
templateUrl: './project.component.html',
imports: [MatDividerModule],
styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
@Input() projectItem!:project;
constructor() {
}

ngOnInit(){

}
}