import { Component, OnInit } from '@angular/core';
import { myProjects } from '../shared/info';

@Component({
selector: 'projects-component',
templateUrl: './projects.component.html',
styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

constructor() {
}

listProjects: project[] = [];

ngOnInit(){
    this.listProjects = myProjects.map((projectItem) => {
      return {
        id: projectItem.id,
        title: projectItem.title,
        description: projectItem.description,
        subDescription: projectItem.subDescription,
        href: projectItem.href,
        logo: projectItem.logo,
        image: projectItem.image,
        tags: projectItem.tags
      };
    });
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