import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import {  AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { BaseServiceService } from 'src/app/services/base-service.service';

@Component({
  selector: 'app-self-registration',
  templateUrl: './self-registration.component.html',
  styleUrls: ['./self-registration.component.scss']
})
export class SelfRegistrationComponent implements OnInit{
  registerForm:FormGroup;
  otpForm:FormGroup;
  isOtpEnable:boolean = false;
  userName:any
  userRole:any;

  constructor(private authService:AuthService,
    private router: Router,
    private baseService: BaseServiceService ){

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

    this.otpForm =  new FormGroup({
      otp: new FormControl('', Validators.required)
    })
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
    this.userName= emailphno
    this.authService.Signup(name, emailphno, phoneNumber, secretToken).subscribe({
      next:(res)=>{
        console.log('res',res)
        if(res.params.status === 'SUCCESSFUL'){
          this.authService.getOtp(emailphno).subscribe({
            next:(res)=>{
              console.log('otpRes',res)
              this.isOtpEnable = true
            },
            error:(err)=>{
              console.log(err)
              if(err.status == 200){
                this.isOtpEnable = true
              }
              
            }
          })
          // this.router.navigate(['/login'])
        }
      }, 
      error: (err) => {
        // this.toastrService.showToastr(err, 'Error', 'error', '');
        // Handle the error here in case of login failure
      }
    })
  }


  signUpOtpform(value:any) {
    this.authService.otpLogin(this.userName, value.otp).subscribe({
      next:(res)=>{
        console.log(res)
        this.router.navigate(['/login'])
        if(res){
          this.authService.saveUserData(res);
          if(this.authService.isLoggedIn()){
            this.userRole= this.baseService.getUserRole()[0];
            switch (this.userRole) {
             case 'StudentFromUP':
               this.router.navigate(['/claims/manage']);
               break;
             case 'SuperAdmin':
               this.router.navigate(['/super-admin']);
               break;
             case 'Regulator':
                 this.router.navigate(['/admin']);
                 break;
             default:
             
           }
          }
       
          // this.router.navigate(['/claims/manage'])
       }
      },
      error:(err)=>{
        console.log(err)
         this.router.navigate(['/login'])
      }
    })
    }
 
}
