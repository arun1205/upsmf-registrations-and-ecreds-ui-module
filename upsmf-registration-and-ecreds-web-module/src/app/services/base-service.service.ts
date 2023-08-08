import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { claimDetails, claimcolumn, studentDetails } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  constructor(private httpClient: HttpClient) { }

  loadActivity$() : Observable<any> {
    return this.httpClient.get<any>("https://www.boredapi.com/api/activity");
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
