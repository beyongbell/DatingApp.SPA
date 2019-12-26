import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@service/auth.service';

import { AppComponent } from './app.component';
import { ValueComponent } from './pages/value/value.component';
import { NavComponent } from './layouts/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent,
      HomeComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [
     AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
