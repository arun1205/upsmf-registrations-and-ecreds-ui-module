import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-payment-success-failure',
  templateUrl: './payment-success-failure.component.html',
  styleUrls: ['./payment-success-failure.component.scss']
})
export class PaymentSuccessFailureComponent {
  isSuccess:boolean = true;
constructor(private router: Router){

}

navigateToHome(){
  this.router.navigate(['/claims/manage'])
}
}
