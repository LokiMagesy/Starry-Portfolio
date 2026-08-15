import { Component, OnInit } from '@angular/core';
import { myProjects } from '../../shared/info';
import { ProjectComponent } from "../components/project/project.component";
import {MatDividerModule} from '@angular/material/divider';

@Component({
selector: 'projects-component',
templateUrl: './projects.component.html',
styleUrls: ['./projects.component.css'],
imports: [ProjectComponent, MatDividerModule]
})
export class ProjectsComponent implements OnInit {

constructor() {
}

listProjects: project[] = [];
ngOnInit(){
    this.listProjects = myProjects.map((projectItem:project) => {
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
