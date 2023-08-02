import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  // loginform:FormControl;
  loginForm: FormGroup;

  constructor(private router:Router){
    this.loginForm = new FormGroup({
      emailphno: new FormControl('', [Validators.required, this.emailOrPhoneValidator()]),
      password: new FormControl('',Validators.required)

    })
  }
  emailOrPhoneValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phonePattern = /^\d{10}$/;

      if (!emailPattern.test(value) && !phonePattern.test(value)) {
        return { invalidInput: true };
      }

      return null;
    };
  }

  signInForm(){
    console.log(this.loginForm)
  }

  }


