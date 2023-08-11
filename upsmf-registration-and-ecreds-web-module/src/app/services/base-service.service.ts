import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { claimDetails, claimcolumn, studentDetails,BasicCandidateDetails } from '../interfaces/interfaces';
import { HttpService } from "../core/services/http-service/http.service";

import { environment } from 'src/environments/environment';
import { ConfigService, RequestParam, ServerResponse } from '../modules/shared';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService  extends HttpService   {
  override baseUrl: string;
   headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ6eE80ak9FNWNjQjhGeXhuZnlIaGZNY1NYNDd0UXRCSWl4ellIbnBWdzlRIn0.eyJleHAiOjE2OTE4MzkzOTgsImlhdCI6MTY5MTc1Mjk5OCwianRpIjoiNTU4YzVjOWEtYjYzOC00NzAyLWFlNTItNGUwMGE2YTI3N2M0IiwiaXNzIjoiaHR0cDovL3JlZ2lzdHJhdGlvbi51cGhyaC5pbjo4MDgwL2F1dGgvcmVhbG1zL3N1bmJpcmQtcmMiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiOWM0YzNkZmEtMTE1Yy00NmFlLTgyY2EtNmE3NDFjYjMzNzBjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicmVnaXN0cnktZnJvbnRlbmQiLCJzZXNzaW9uX3N0YXRlIjoiODM4NGMwMWYtNWFkMC00MTQ0LWJhYTAtNTMyMzdkNDA4Y2I4IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJTdHVkZW50RnJvbVVQIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtbmRlYXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFydW4ubmFpckBleGFtcGxlLmNvbSIsImVudGl0eSI6WyJTdHVkZW50RnJvbVVQIl0sImVtYWlsIjoiYXJ1bi5uYWlyQGV4YW1wbGUuY29tIn0.JgelJRLpgCn8Xpk_bYm-8uruaF6flkLBN6fpx19P6sXSuQS4lc-WOWBxevIHvoNaf4XNOPl8wB8yRUvVEJeCy5VsjFQo847pwt7LCvUwnZpy-nD8y0TAvFaFmg24m6QKSwPf4QwGP4CLCUJftMzScpR7pFZhkvwDZjJyjmD9ztQ3DMDPBycnQC263xhN-LZYKQx4Dd_jEd-O706dsISN5XGM9Exlby_jr7P1XMGuwjVBniVXZKKtBaGhb_mJfhnr0s3kxOHBLt_BVFJZYmDjuGPL8XfcuC9N4WRhDEHnr25Rc8_VHaXsKECtE4iUb327x0_yBIvFMpPW4Y0mBPzN-w`
   };
 //baseUrl: string;
  constructor(private httpClient: HttpClient,private configService: ConfigService) { 
    super(httpClient);
    this.baseUrl = environment.apiUrl;
  }

  

  loadActivity$() : Observable<any> {
    return this.httpClient.get<any>("https://www.boredapi.com/api/activity");
 /*     console.log(this.baseUrl);
    const reqParam: RequestParam = {
      url: this.configService.urlConFig.URLS.GRIEVANCE_TICKETS.GET_ALL_TICKETS,
      data: {
       
      }
    }
    return this.post(reqParam);  */
  }
  candidateDetails$(): Observable<any>{
    return this.httpClient.get<any>("https://api.agify.io/?name=meelad");
  }

  makeClaim$(osid: string ): Observable<any>{
   // console.log(body)
    const body =
      {
        "entityName": "Student",
        "entityId": osid,
        "name": "studentVerification",
        "propertiesOSID": {
            "Student": [
              osid
            ]
        }
    }
    
    const reqParam: RequestParam = {
      url: this.configService.urlConFig.URLS.CLAIMS.MAKE_CLAIM, 
      data: body,
      header: this.headers
    }
    return this.post(reqParam);
  }
  inviteStudent$(body: studentDetails): Observable<any>{
    console.log(body)
    const reqParam: RequestParam = {
      url: this.configService.urlConFig.URLS.STUDENT.INVITE_STUDENT, 
      data: body, 
      header: this.headers
    }
    console.log(reqParam)
    return this.post(reqParam);
  }
  createClaim$(body: claimDetails): Observable<any>{
    console.log(body)
    return of({id:"1-fb5333e7-42ea-481b-ab0b-6422c85172ad"});
  }

  
  getCandidatePersonalDetails$(){

       const reqParam: RequestParam = {
         url: this.configService.urlConFig.URLS.STUDENT.GET_STUDENT_DETAILS,  
         /* data:{
          "name": "Arun ",
          "phoneNumber": "9887478248",
          "email": "arun.nair@example.com"
      }, */
         header: this.headers
       }
       return this.get(reqParam);
     
     }

     updateStudent$(osid:string , body: any){
      console.log(body)
         const reqParam: RequestParam = {
           url: this.configService.urlConFig.URLS.STUDENT.UPDATE + osid,  
           data: body,
           header: this.headers
         }
         return this.put(reqParam);
       
       }

  getClaims$(){
 /*    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ6eE80ak9FNWNjQjhGeXhuZnlIaGZNY1NYNDd0UXRCSWl4ellIbnBWdzlRIn0.eyJleHAiOjE2OTE1NzQ2NjcsImlhdCI6MTY5MTQ4ODI2NywianRpIjoiMjRkZTViOWUtMzczZi00YThmLWE3ZGQtYmZhNzY1NDBkYzNkIiwiaXNzIjoiaHR0cDovLzM0LjEwMC4yMTIuMTU2OjgwODAvYXV0aC9yZWFsbXMvc3VuYmlyZC1yYyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI0YzE0MzY5NC00YTc2LTQ4NzktYTc1MS01YjZmM2I2YjQ1ZjQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWdpc3RyeS1mcm9udGVuZCIsInNlc3Npb25fc3RhdGUiOiIzZmFjOWY0NS1jMTkwLTRmNjAtOGUwNy0xMmQ0MmVhNzJmZjIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vbG9jYWxob3N0OjQyMDIiLCJodHRwOi8vbG9jYWxob3N0OjgxODAvYXV0aCIsImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMiIsImh0dHBzOi8vbG9jYWxob3N0OjQyMDAiLCJodHRwczovL25kZWFyLnhpdi5pbiIsImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCIsImh0dHA6Ly9uZGVhci54aXYuaW4iLCJodHRwOi8vMjAuMTk4LjY0LjEyOCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIlJlZ3VsYXRvciIsImRlZmF1bHQtcm9sZXMtbmRlYXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6Im1hbm1vaGFuMkB0ZXN0LmNvbSIsImVudGl0eSI6WyJSZWd1bGF0b3IiXSwiZW1haWwiOiJtYW5tb2hhbjJAdGVzdC5jb20ifQ.NDe8jl0sWGioI3aoovi9yy4pdE3-qjSHQ2CL_TgcFia7iRE2A6yqMvOkM-wq7Pf3bGxACSMiL89wlruqK0Rs2lRgN3tW8EqgNmWC3zyvfA1R1qOD8FnIRDWqt2XgCP2zagqr502iXNA2VdY5yh1vfhX3waSPJXOpfv_xNj88na4UD7o_yzIkSXEntT2kW_u1U3Wj7q62Trl7gFhFdp_gMtw10uRNQAvuBYLJDwEUwS0JvY1xNE2OYpHufIlcs2dYg2BzyYsbYQj0ZtJHBjY0DeWOoRy4RSC6JsB21KRJZVBC-gxp-4FFCyT6jeVHvzaau7tKJFJcpxM_Gn0rtxwKlw`
    };
    

 
    return this.httpClient.get<any>("http://localhost:8081/api/v1/Regulator/claims/", { 'headers': headers });
  
   */

    const reqParam: RequestParam = {
      url: this.configService.urlConFig.URLS.CLAIMS.GET_ALL_CLAIMS,  
      header: this.headers
    }
    return this.get(reqParam);
  
  }


 
}
