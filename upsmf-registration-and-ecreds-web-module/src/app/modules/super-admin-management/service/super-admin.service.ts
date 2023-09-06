import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http-service/http.service';
import { ConfigService, RequestParam, ServerResponse } from '../../shared';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { createUserData } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService extends HttpService {

  headers  = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}` };
  override baseUrl: string;
  private userManagementbaseURL: string;

  constructor(http: HttpClient, private configService: ConfigService) { 
    super(http);
    this.baseUrl = environment.apiUrl;
    this.userManagementbaseURL =  environment.usermanagementApiURL
  }

  getAllUsers(): Observable<any>  {
    const request = {
      "offset":"300",
       "size":"700"
    };
    // const  reqParam: RequestParam = { url: this.configService.urlConFig.URLS.USER.GET_ALL_USERS}
    const reqParam: RequestParam = {
      url: this.userManagementbaseURL + this.configService.urlConFig.URLS.USER.GET_ALL_USERS,
      header: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSR3RkMkZzeG1EMnJER3I4dkJHZ0N6MVhyalhZUzBSSyJ9.kMLn6177rvY53i0RAN3SPD5m3ctwaLb32pMYQ65nBdA',
      },
      data: request
    }
    return this.userPost(reqParam);
  } 

  updateUser(userDetails: any): Observable<any>  {
    const  reqParam: RequestParam = { 
      url: this.userManagementbaseURL + this.configService.urlConFig.URLS.USER.UPDATE_USER,
      header: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSR3RkMkZzeG1EMnJER3I4dkJHZ0N6MVhyalhZUzBSSyJ9.kMLn6177rvY53i0RAN3SPD5m3ctwaLb32pMYQ65nBdA',
      },
      data: userDetails
    }
    return this.userPut(reqParam);
  }

  getUserDetails(id: string): Observable<any> {
    const request = {
      userName: id
    }
    const reqParam: RequestParam = {
      url: this.userManagementbaseURL + this.configService.urlConFig.URLS.USER.GET_USERDETAILS_BY_ID,
      header: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSR3RkMkZzeG1EMnJER3I4dkJHZ0N6MVhyalhZUzBSSyJ9.kMLn6177rvY53i0RAN3SPD5m3ctwaLb32pMYQ65nBdA',
      },
      data: {request}
    }
    return this.userPost(reqParam);
  }

  deactivateUser(request: any): Observable<any>  {
    const  reqParam: RequestParam = { 
      url: this.userManagementbaseURL + this.configService.urlConFig.URLS.USER.DELETE_USER,
      header: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSR3RkMkZzeG1EMnJER3I4dkJHZ0N6MVhyalhZUzBSSyJ9.kMLn6177rvY53i0RAN3SPD5m3ctwaLb32pMYQ65nBdA',
      },
      data: request
    }
    return this.userPost(reqParam);
  }


  Createuser$(body : createUserData, endPointUrl:string ): Observable<any>{
    // console.log(body)
     const reqParam: RequestParam = {
       url: endPointUrl,
       data: body,
       header: this.headers
     }
     return this.post(reqParam);
   }

   getEmails(body:any):Observable<any>{
    const reqParam: RequestParam = {
      url: this.userManagementbaseURL +this.configService.urlConFig.URLS.USER.GET_EMAIL_DETAILS,
      data: body,
      header: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSR3RkMkZzeG1EMnJER3I4dkJHZ0N6MVhyalhZUzBSSyJ9.kMLn6177rvY53i0RAN3SPD5m3ctwaLb32pMYQ65nBdA',
      }
    }
    return this.userPost(reqParam);
   }
}


