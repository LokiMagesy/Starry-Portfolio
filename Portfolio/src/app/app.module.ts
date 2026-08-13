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
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AboutComponent } from './homepage/about/about.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CardComponent } from './components/card.component';
import { CopyemailbuttonComponent } from './components/copy-email-button.component';
import {MatDividerModule} from '@angular/material/divider';
import { ProjectsComponent } from './main/projects.component';
import { ProjectComponent } from './main/components/project.component';
import { ContactpageComponent } from './contact/contactPage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    ParralaxbackgroundComponent,
    AboutComponent,
    CardComponent,
    CopyemailbuttonComponent,
    ProjectsComponent,
    ProjectComponent,
    ContactpageComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    FlipWordsComponent,
    HeroTextComponent,
    MatCardModule,
    MatButtonModule,
    DragDropModule,
    MatDividerModule,
    ReactiveFormsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
