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
  userRole:string = ''

  constructor(private router:Router,
    private authService: AuthService,
    private baseService: BaseServiceService){
    this.loginForm = new FormGroup({
      emailphno: new FormControl('student84@yopmail.com', [Validators.required, this.emailOrPhoneValidator()]),
      password: new FormControl('Student@84',Validators.required)

    })
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      // Redirect to the home page if logged in
       this.baseService.getUserRole().then((res)=>{
        console.log(res)
      //  this.userRole=
      });
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

  signInForm(value:any){
    console.log(this.loginForm)
    const {emailphno, password}= value
    this.authService.login(emailphno, password).subscribe({
      next:(res)=>{
        console.log('loginREs',res)
       if(res){
          this.authService.saveUserData(res);
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
          // this.router.navigate(['/claims/manage'])
       }
      }
    })
  }

  navigateToSignupPage(){
    this.router.navigate(['/registration'])
  }
  

  }


