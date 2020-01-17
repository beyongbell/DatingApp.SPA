import { AlertifyService } from '@service/alertify.service';
import { AuthService } from '@service/auth.service';
import { UserService } from '@service/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Message } from '@interface/message';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() recipientId: number;
  messages: Message[];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.userService.getMessageThread(this.authService.decodeToken.nameid, this.recipientId)
      .subscribe(messages => {
          this.messages = messages;
          console.log(this.messages);
      }, error => {
        this.alertify.error(error);
      });
  }

}
