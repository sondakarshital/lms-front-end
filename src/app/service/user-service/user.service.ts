import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

   public createUser(userDetail: Object): Observable<Object> {
     console.log("userDetail",userDetail);
    return this.http.post(`${this.baseUrl}/users`, userDetail);
  }
  public verifyEmail(email){
    return this.http.post(`${this.baseUrl}/user/verify-email`, email);
  }
  public users(): Observable<any> {
   return this.http.get(`${this.baseUrl}/users/all`);
 }
}
