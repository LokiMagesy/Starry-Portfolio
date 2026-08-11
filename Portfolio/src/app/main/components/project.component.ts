import { Component, Input, OnInit } from '@angular/core';

@Component({
selector: 'project-component',
templateUrl: './project.component.html',
styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
    @Input() projectItem!:project;
    constructor() {
    }



    ngOnInit(){

    }
}

interface project {
    id:number;
    title:string;
    description:string;
    subDescription:string[];
    href:string;
    logo:string;
    image:string;
    tags:tags[];
}

interface tags {
    id:number;
    name:string;
    path:string;
}