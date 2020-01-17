import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Message } from '@interface/message';
import { Pagination, PaginatedResult } from '@interface/pagination';
import { AlertifyService } from '@service/alertify.service';
import { AuthService } from '@service/auth.service';
import { UserService } from '@service/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
      this.route.data.subscribe(data => {
        this.messages   = data.messages.result;
        this.pagination = data.messages.pagination;
      });
  }

  loadMessages() {
    this.userService.getMessages(
      this.authService.decodeToken.nameid,
      this.pagination.currentPage,
      this.pagination.itemsPerPage,
      this.messageContainer
    ).subscribe((response: PaginatedResult<Message[]>) => {
      this.messages   = response.result;
      this.pagination = response.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
