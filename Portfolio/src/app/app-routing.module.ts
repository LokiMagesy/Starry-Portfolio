import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

import { NavbarComponent } from './components/navbar.component';

import { HeroComponent } from './components/hero.component';

import { AboutComponent } from './components/about.component';


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
