import { ListsComponent } from './pages/lists/lists.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { MemberListComponent } from './pages/member-list/member-list.component';
import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
   { path: 'home',     component: HomeComponent },
   { path: 'members',  component: MemberListComponent },
   { path: 'messages', component: MessagesComponent },
   { path: 'lists',    component: ListsComponent },
   { path: '**',       redirectTo: 'home', pathMatch: 'full' }
];
