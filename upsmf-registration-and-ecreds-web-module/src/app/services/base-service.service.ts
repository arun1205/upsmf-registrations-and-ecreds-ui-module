import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  constructor(private httpClient: HttpClient) { }

  loadActivity$() : Observable<any> {
    return this.httpClient.get<any>("https://www.boredapi.com/api/activity");
  }
 
}
