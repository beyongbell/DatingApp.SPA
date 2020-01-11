import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { JwtModule } from '@auth0/angular-jwt';

import { NgxGalleryModule } from 'ngx-gallery';

import { ErrorInterceptorProvider } from './Interceptor/error.interceptor';

import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';

import { MemberListResolver } from '@resolver/member-list.resolver';
import { MemberDetailResolver } from '@resolver/member-detail.resolver';
import { MemberEditResolver } from '@resolver/member-edit.resolver';

import { AppComponent } from './app.component';
import { NavComponent } from './layouts/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { MemberListComponent } from './pages/members/member-list/member-list.component';
import { ListsComponent } from './pages/lists/lists.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { MemberCardComponent } from './pages/members/member-card/member-card.component';
import { MemberDetailComponent } from './pages/members/member-detail/member-detail.component';
import { MemberEditComponent } from './pages/members/member-edit/member-edit.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch  : { enable: false },
    rotate : { enable: false }
  };
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      NgxGalleryModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
        config: {
          tokenGetter,
          whitelistedDomains: ['localhost:5001'],
          blacklistedRoutes: ['localhost:5001/api/auth']
        }
      })
   ],
   providers: [
    ErrorInterceptorProvider,
    MemberListResolver,
    MemberDetailResolver,
    MemberEditResolver,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
