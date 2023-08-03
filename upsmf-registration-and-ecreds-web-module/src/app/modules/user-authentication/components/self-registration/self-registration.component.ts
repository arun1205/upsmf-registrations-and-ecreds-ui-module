import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import {  AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-self-registration',
  templateUrl: './self-registration.component.html',
  styleUrls: ['./self-registration.component.scss']
})
export class SelfRegistrationComponent implements OnInit{
  registerForm:FormGroup;

  ngOnInit(){
    this.initForm();
  }
  
  initForm(){
    this.registerForm = new FormGroup({  
      rollno:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      instid: new FormControl('',Validators.required),
      instname: new FormControl('',Validators.required) ,
      emailphno: new FormControl('',[Validators.required, this.emailOrPhoneValidator()]),

     
    });
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

  otpForm(){
    console.log(this.registerForm)
  }
 
}
