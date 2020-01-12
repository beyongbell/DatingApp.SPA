import { HttpClient } from '@angular/common/http';
import { User } from '@interface/user';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl   = environment.api3 + 'auth/';
  baseUrl2  = environment.api2 + 'auth/';

  jwtHelper = new JwtHelperService();
  decodeToken: any;
  currentUser: User;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodeToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
