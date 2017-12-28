import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GiggersComponent } from './giggers/giggers.component';
import { HomepageComponent } from './homepage/homepage.component';
import { GiggersService } from './giggers.service';
import { CreategiggerComponent } from './creategigger/creategigger.component';
import { RoutingModule } from '../app/app.routing';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatCheckboxModule 
} from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    GiggersComponent,
    HomepageComponent,
    CreategiggerComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,   
    MatButtonModule, MatCardModule,
    MatInputModule,MatSnackBarModule,
    MatToolbarModule,HttpModule, 
    FormsModule, ReactiveFormsModule,RoutingModule, MatCheckboxModule,

  ],
  providers: [GiggersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
