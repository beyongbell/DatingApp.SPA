import { AlertifyService } from '@service/alertify.service';
import { UserService } from '@service/user.service';
import { AuthService } from '@service/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '@interface/user';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: User;

  constructor(private authService: AuthService, private userService: UserService, private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodeToken.nameid, id).subscribe(data => {
      this.alertifyService.success('You have liked: ' + this.user.knownAs);
    }, error => {
      this.alertifyService.error(error)
    });
  }

}
