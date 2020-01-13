import { AuthService } from '@service/auth.service';
import { AlertifyService } from '@service/alertify.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  model: any = {};
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender   : ['male'],
      username : ['', Validators.required],
      knownAs  : ['', Validators.required],
      dateOfBirth : [null, Validators.required],
      city     : ['', Validators.required],
      country  : ['', Validators.required],
      password : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword : ['', Validators.required]
    }, { validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch : true };
  }

  register() {
    //  this.authService.register(this.model).subscribe(() => {
    //     this.alertify.success('Register Successful');
    //  }, error => {
    //     this.alertify.error(error);
    //  });
    console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
