import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService, RequestParam, ServerResponse } from 'src/app/modules/shared';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService{
 override baseUrl: string;
 usermanagementApiURL:string;
 

  constructor(http: HttpClient, private configService: ConfigService) {
    super(http);
    this.baseUrl = environment.apiUrl;
    this.usermanagementApiURL =  environment.usermanagementApiURL

   }
  
   Signup(name:string, email:string, phoneNumber: string, secretToken:string): Observable<any> {
    // Implement your login API call and get the JWT token
    const reqParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.SIGN_UP,
      data: {name, email, phoneNumber, secretToken},
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    return this.SignuUpost(reqParam);
  }

  login(username: string, password: string): Observable<any> {
    // Implement your login API call and get the JWT token
    const reqParam: RequestParam = {
      url: this.usermanagementApiURL + this.configService.urlConFig.URLS.LOGIN,
      data: {username,password},
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSR3RkMkZzeG1EMnJER3I4dkJHZ0N6MVhyalhZUzBSSyJ9.kMLn6177rvY53i0RAN3SPD5m3ctwaLb32pMYQ65nBdA',
      }
    }
    return this.loginPost(reqParam);
  }

}
