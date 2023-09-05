import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BaseServiceService } from '../services/base-service.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-payment-success-failure',
  templateUrl: './payment-success-failure.component.html',
  styleUrls: ['./payment-success-failure.component.scss']
})
export class PaymentSuccessFailureComponent implements OnInit {
  isSuccess:boolean = true;
  paymentResponse:string = ''
  resData:any;
  getMakeClaimbody:any;
constructor(private router: Router,
  private route: ActivatedRoute,
  private baseService: BaseServiceService){

}

ngOnInit(): void {
 const storedData=  localStorage.getItem('payData')
 if(storedData){
  this.resData = JSON.parse(storedData)
  console.log("localData",this.resData)
 }
 
  
  this.route.queryParams.subscribe((param)=>{
  console.log('param',param)
  if(param['resp']){
    this.paymentResponse = param['resp']
    this.makeClaim()
  }
  
  })
}
  makeClaim() {
    if (this.paymentResponse === 'success' && this.resData) {
      const updateStudent = {
        "paymentStatus": "SUCCESS",
      }
      this.baseService.updateStudentData$(this.resData.osId, updateStudent, this.resData.endPointUrl)
        .pipe(
          mergeMap((resp: any) => {
            this.getMakeClaimbody = {
              entityId: this.resData.osId,
            }
            switch (this.resData?.origin) {
              case 'StudentOutsideUP':
                this.getMakeClaimbody = {
                  ...this.getMakeClaimbody,
                  entityName: "StudentOutsideUP",
                  name: "studentVerification",
                  propertiesOSID: {
                    StudentOutsideUP: [
                      this.resData.osId
                    ]
                  }
                }
                break;

              case 'goodStandingCert':
                this.getMakeClaimbody = {
                  ...this.getMakeClaimbody,
                  entityName: "StudentGoodstanding",
                  name: "studentGoodstandingVerification",
                  propertiesOSID: {
                    StudentGoodstanding: [
                      this.resData.osId
                    ]
                  }

                }
                break;
                case 'ForeignVerifyReq':
                  this.getMakeClaimbody={
                    ...this.getMakeClaimbody,
                    entityName:"StudentForeignVerification",
                    name:"StudentForeignVerify",
                    propertiesOSID: {
                      StudentForeignVerification: [
                        this.resData.osId
                      ]
                    }
                  }
                break;
                case 'StudentFromUP':
                  console.log("....outside up....")
                this.getMakeClaimbody = {
                  ...this.getMakeClaimbody,
                  entityName: "StudentFromUP",
                  name: "studentVerification",
                  propertiesOSID: {
                    StudentFromUP: [
                      this.resData.osId
                    ]
                  }

                }
                break;

            }

            return this.baseService.makeClaim$(this.resData.osId, this.getMakeClaimbody);
          }
          )).subscribe((data) => {
            console.log(data)
            if(data.params['status'] === 'SUCCESSFUL'){
              localStorage.removeItem('payData');
            }
          })


    }
  }

navigateToHome(){
  this.router.navigate(['/claims/manage'])
}
}
