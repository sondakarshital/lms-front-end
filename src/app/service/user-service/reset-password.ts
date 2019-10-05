import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

   public resetPassword(email): Observable<Object> {
     console.log("email",email);
     return this.http.post(`${this.baseUrl}/user/reset-password`, email);
  }
  public newPassword(user,token){
    return this.http.post(`${this.baseUrl}/user/reset-password/`+token, user);
  }
}
