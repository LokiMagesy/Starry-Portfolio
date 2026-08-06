import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './homepage/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HeroComponent } from './homepage/Hero/hero.component';
import { HeroTextComponent } from "src/app/components/heroText";
import { FlipWordsComponent } from './components/FlipWordsComponent';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    HeroTextComponent,
    FlipWordsComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
