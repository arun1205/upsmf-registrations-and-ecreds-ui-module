import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.scss']
})
export class PasswordPageComponent {
  passwordForm: FormGroup;
  isEnableOtpLogin:boolean = false;


  constructor(private router:Router){
    this.passwordForm = new FormGroup({
      password: new FormControl('',Validators.required),
      confirmpass: new FormControl('',Validators.required),
      otp: new FormControl('',Validators.required),



    })
    
  }
  

  passwordOtpForm(){
    console.log(this.passwordForm)
  }
  navigateBackToLoginEmailPassword(){
    this.isEnableOtpLogin = false;
  }

  }

