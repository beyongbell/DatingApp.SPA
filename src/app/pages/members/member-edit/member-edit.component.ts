import { AlertifyService } from '@service/alertify.service';
import { AuthService } from '@service/auth.service';
import { UserService } from '@service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '@interface/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
      private alertifyService: AlertifyService,
      private userService: UserService,
      private authService: AuthService
  ) { }

  user: User;
  photoUrl: string;

  @ViewChild('editForm', { static: true}) editForm: NgForm;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodeToken.nameid, this.user).subscribe(next => {
      this.alertifyService.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertifyService.error(error);
    });
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}
