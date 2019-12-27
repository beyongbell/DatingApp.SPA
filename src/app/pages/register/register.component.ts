import { AuthService } from '@service/auth.service';
import { AlertifyService } from '@service/alertify.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
     this.authService.register(this.model).subscribe(() => {
        this.alertify.success('Register Successful');
     }, error => {
        this.alertify.error(error);
     });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
