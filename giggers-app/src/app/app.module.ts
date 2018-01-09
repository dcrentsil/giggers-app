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
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { StoreModule } from '@ngrx/store';
import { giggerReducer } from './redux/reducers/giggers.reducer';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';


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
import { GiggerEffects } from './redux/effects/giggers.effect';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    GiggersComponent,
    HomepageComponent,
    CreategiggerComponent,
    NavbarComponent,
    AboutComponent,
    LoginComponent
  ],
  imports: [
    NgReduxModule,
    EffectsModule.forRoot([GiggerEffects]),
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25 //  Retains last 25 states
    // }),
    StoreModule.forRoot({ gigger: giggerReducer}),
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
