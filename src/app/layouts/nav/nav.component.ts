import { AuthService } from '@service/auth.service';
import { AlertifyService } from '@service/alertify.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
     this.authService.login(this.model).subscribe(next => {
        this.alertify.success('Logged in Successfully');
     }, error => {
        this.alertify.error(error);
     }, () => {
      this.router.navigate(['/members']);
     });
  }

  get loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodeToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logged Out');
    this.router.navigate(['home']);
  }

}
