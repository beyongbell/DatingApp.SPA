import { AuthGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';

import { ListsComponent } from './pages/lists/lists.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { MemberListComponent } from './pages/members/member-list/member-list.component';
import { HomeComponent } from './pages/home/home.component';
import { MemberDetailComponent } from '@page/members/member-detail/member-detail.component';

export const appRoutes: Routes = [
   { path: '', component: HomeComponent },
   {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children : [
        { path: 'members',      component: MemberListComponent },
        { path: 'members/:id',  component: MemberDetailComponent },
        { path: 'messages',     component: MessagesComponent },
        { path: 'lists',        component: ListsComponent },
      ]
   },
   { path: '**', redirectTo: '', pathMatch: 'full' }
];
