import { AuthService } from '@service/auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from './../services/alertify.service';
import { UserService } from '@service/user.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Message } from '@interface/message';

@Injectable()
export class MessagesResolver implements Resolve<Message> {
  pageNumber = 1;
  pageSize   = 5;
  messageContainer = 'Unread';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Message> {
    return this.userService.getMessages(
        this.authService.decodeToken.nameid,
        this.pageNumber,
        this.pageSize,
        this.messageContainer
      ).pipe(
      catchError(error => {
        this.alertifyService.error('Problem retrieving message');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }

}
