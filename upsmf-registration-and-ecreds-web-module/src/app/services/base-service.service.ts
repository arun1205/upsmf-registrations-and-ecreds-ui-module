import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { claimDetails, claimcolumn, studentDetails } from '../interfaces/interfaces';
//import { HttpService } from "src/app/core";

import { environment } from 'src/environments/environment';
//import { ConfigService, RequestParam, ServerResponse } from '../modules/shared';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService   {
 // override baseUrl: string;
 baseUrl: string;
  constructor(private httpClient: HttpClient) { 
    //super(httpClient);
    this.baseUrl = environment.apiUrl;
  }

  loadActivity$() : Observable<any> {
    return this.httpClient.get<any>("https://www.boredapi.com/api/activity");
   /*  console.log(request);
    const reqParam: RequestParam = {
      url: this.configService.urlConFig.URLS.GRIEVANCE_TICKETS.GET_ALL_TICKETS,
      data: {
        ...request
      }
    }
    return this.post(reqParam); */
  }
  candidateDetails$(): Observable<any>{
    return this.httpClient.get<any>("https://api.agify.io/?name=meelad");
  }
  makeClaim$(body: claimcolumn): Observable<any>{
    console.log(body)
    return of({respone:"success"});
  }
  updateStudent$(body: studentDetails): Observable<any>{
    console.log(body)
    return of({id:"1-fb5333e7-42ea-481b-ab0b-6422c85172ad"});
  }
  createClaim$(body: claimDetails): Observable<any>{
    console.log(body)
    return of({id:"1-fb5333e7-42ea-481b-ab0b-6422c85172ad"});
  }


 
}
