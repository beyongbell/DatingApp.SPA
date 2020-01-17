import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TimeAgoPipe } from 'time-ago-pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';

import { JwtModule } from '@auth0/angular-jwt';

import { NgxGalleryModule } from 'ngx-gallery';

import { PaginationModule } from 'ngx-bootstrap/pagination';

import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ErrorInterceptorProvider } from './Interceptor/error.interceptor';

import { FileUploadModule } from 'ng2-file-upload';

import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';

import { MemberListResolver } from '@resolver/member-list.resolver';
import { MemberDetailResolver } from '@resolver/member-detail.resolver';
import { MemberEditResolver } from '@resolver/member-edit.resolver';
import { ListResolver } from '@resolver/list.resolver';
import { MessagesResolver } from '@resolver/messages.resolver';

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
import { PhotoEditorComponent } from './pages/members/photo-editor/photo-editor.component';
import { MemberMessagesComponent } from './pages/members/member-messages/member-messages.component';

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
      TimeAgoPipe,
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent,
      MemberMessagesComponent
   ],
   imports: [
      BrowserAnimationsModule,
      BsDatepickerModule.forRoot(),
      PaginationModule.forRoot(),
      ButtonsModule.forRoot(),
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      NgxGalleryModule,
      FileUploadModule,
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
    ListResolver,
    MessagesResolver,
    PreventUnsavedChanges,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
