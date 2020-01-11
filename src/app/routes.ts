import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';
import { AuthGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';

import { MemberListResolver } from '@resolver/member-list.resolver';
import { MemberDetailResolver } from '@resolver/member-detail.resolver';
import { MemberEditResolver } from '@resolver/member-edit.resolver';

import { ListsComponent } from '@page/lists/lists.component';
import { MessagesComponent } from '@page/messages/messages.component';
import { MemberListComponent } from '@page/members/member-list/member-list.component';
import { HomeComponent } from '@page/home/home.component';
import { MemberDetailComponent } from '@page/members/member-detail/member-detail.component';
import { MemberEditComponent } from '@page/members/member-edit/member-edit.component';


export const appRoutes: Routes = [
   { path: '', component: HomeComponent },
   {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children : [
        { path: 'members',      component: MemberListComponent   , resolve: { users : MemberListResolver  } },
        { path: 'members/:id',  component: MemberDetailComponent , resolve: { user  : MemberDetailResolver} },
        { path: 'member/edit',  component: MemberEditComponent   , resolve: { user  : MemberEditResolver  } ,
            canDeactivate: [PreventUnsavedChanges]
        },
        { path: 'messages',     component: MessagesComponent },
        { path: 'lists',        component: ListsComponent },
      ]
   },
   { path: '**', redirectTo: '', pathMatch: 'full' }
];
