import { Component, OnInit } from '@angular/core';
import { OrbitingComponent } from './orbiting.component';

@Component({
selector: 'framework-component',
templateUrl: './framework.component.html',
  standalone: true,
  imports: [OrbitingComponent],
styleUrls: ['./framework.component.css']
})
export class FrameworkComponent {

  readonly skills = [
    'auth0',
    'blazor',
    'cplusplus',
    'csharp',
    'css3',
    'dotnet',
    'dotnetcore',
    'git',
    'html5',
    'javascript',
    'microsoft',
    'react',
    'sqlite',
    'tailwindcss',
    'vitejs',
    'wordpress'
  ];

  readonly reversedSkills = [...this.skills].reverse();
    readonly skillPaths = this.skills.map(
    skill => `/logos/${skill}.svg`
  );

  readonly reversedSkillPaths = this.reversedSkills.map(
    skill => `/logos/${skill}.svg`
  );
}