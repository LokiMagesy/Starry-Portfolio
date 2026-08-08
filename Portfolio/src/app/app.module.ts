import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './homepage/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HeroComponent } from './homepage/Hero/hero.component';
import { FlipWordsComponent } from './components/FlipWordsComponent';
import { ParralaxbackgroundComponent } from './components/parralaxBackground.component';
import { HeroTextComponent } from './components/HeroText.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    ParralaxbackgroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    FlipWordsComponent,
    HeroTextComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
