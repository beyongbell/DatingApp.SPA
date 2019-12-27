import { AuthService } from '@service/auth.service';
import { AlertifyService } from '@service/alertify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
     this.authService.login(this.model).subscribe(next => {
        this.alertify.success('Logged in Successfully');
     }, error => {
        this.alertify.error(error);
     });
  }

  get loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged Out');
  }

}
