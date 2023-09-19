import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { BaseServiceService } from 'src/app/services/base-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  userRole:string = '';
  isEnableOtpLogin:boolean = false;
  isOtpForm:boolean = false;
  otpForm:FormGroup;

  constructor(private router:Router,
    private authService: AuthService,
    private baseService: BaseServiceService){
    this.loginForm = new FormGroup({
      emailphno: new FormControl('', [Validators.required, this.emailOrPhoneValidator()]),
      password: new FormControl('',Validators.required)

    })

    this.otpForm = new FormGroup({
      otp:new FormControl('', [Validators.required, Validators.pattern(`^[0-9]*$`)])
    })
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      // Redirect to the home page if logged in
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

  signInWithOtp(){
    this.isEnableOtpLogin = true
  }

  navigateBackToLoginEmailPassword(){
    this.isEnableOtpLogin = false;
  }

  navigateBackToEmail(){
    this.isOtpForm = false;
    this.otpForm.reset();
  }

  getOTP(){
    if(this.loginForm.value.emailphno){
     this.isOtpForm = true
     this.authService.getOtp(this.loginForm.value.emailphno).subscribe({
      next: (res) => {
        //console.log(res);
      }
     })
    }
    else{
      alert('please enter emailId')
    }
    //console.log('getOtp',this.loginForm)
  }

  SubmitOTP(){
    this.authService.otpLogin(this.loginForm.value.emailphno, this.otpForm.value.otp).subscribe({
     next: (res) => {
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
     },
     error: (err) => {
       if(err.status !== 200) {
        //  this.toastrService.showToastr('Something went wrong. Please try again', 'Error', 'error', '');
       }
     }
    })
   }

  signInForm(value:any){
    console.log(this.loginForm)
    const {emailphno, password}= value
    this.authService.login(emailphno, password).subscribe({
      next:(res)=>{
        console.log('loginREs',res)
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
      }
    })
  }

  navigateToSignupPage(){
    this.router.navigate(['/registration'])
  }
  

  }


