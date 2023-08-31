import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import {  AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

@Component({
  selector: 'app-self-registration',
  templateUrl: './self-registration.component.html',
  styleUrls: ['./self-registration.component.scss']
})
export class SelfRegistrationComponent implements OnInit{
  registerForm:FormGroup;

  constructor(private authService:AuthService,
    private router: Router){

  }

  ngOnInit(){
    this.initForm();
  }
  
  initForm(){
    // this.registerForm = new FormGroup({  
    //   rollno:new FormControl('',Validators.required),
    //   name:new FormControl('',Validators.required),
    //   instid: new FormControl('',Validators.required),
    //   instname: new FormControl('',Validators.required) ,
    //   emailphno: new FormControl('',[Validators.required, this.emailOrPhoneValidator()]),

     
    // });

    this.registerForm = new FormGroup({  
      name:new FormControl('',Validators.required),
      emailphno: new FormControl('',[Validators.required, this.emailOrPhoneValidator()]),
      phoneNumber: new FormControl('', Validators.required),
      secretToken: new FormControl('',[Validators.required,this.passwordValidator]),
       confirmPassword: new FormControl('', Validators.required)

     
    });
  }
  
  passwordValidator(control: FormControl): { [key: string]: boolean } | null {
    // Implement your password policy validation logic here
    const value: string = control.value;

    // Example password policy: At least 8 characters with one uppercase letter and one digit
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordPattern.test(value)) {
      return { invalidPassword: true };
    }

    return null;
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

  signUpform(value:any){
    const  {name, emailphno, phoneNumber, secretToken } = value
    console.log('signUp',value)
    this.authService.Signup(name, emailphno, phoneNumber, secretToken).subscribe({
      next:(res)=>{
        console.log('res',res)
        if(res.params.status === 'SUCCESSFUL'){
          this.router.navigate(['/login'])
        }
      }, 
      error: (err) => {
        // this.toastrService.showToastr(err, 'Error', 'error', '');
        // Handle the error here in case of login failure
      }
    })
  }
 
}
