import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseContentType,RequestOptions } from '@angular/http';

export class User {
  constructor(public status: string) { }

}

export class JwtResponse{
  constructor(
    public jwttoken:string,
     ) {}
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient,public sanitizer: DomSanitizer) {
  }

  authenticate(email, password) {
    return this.httpClient.post<any>('http://localhost:3000/users/login',{email,password}).pipe(
     map(
       userData => {
        this.sessionSet('username',email,1);
        // sessionStorage.setItem('username',username);
        let tokenStr= 'Bearer '+userData.token;
        sessionStorage.setItem('token', tokenStr);
        return userData;
       }
     )
    );
  };

  userProfile(id):any{
    // console.log("userDetail",id);
    // return this.httpClient.get<any>("http://localhost:3000/users/"+id+"/avatar",{
    //   responseType: 'blob'
    // }).ma
    var url = "http://localhost:3000/users/"+id+"/avatar";
    return this.httpClient.get(url, {
      responseType: 'blob'
    })
    .pipe(
      map((res: any) => {
        const urlCreator = window.URL;
        return this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(res));
      })
   );
  }

  isUserLoggedIn() {
    let user = this.sessionGet('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
  }

  sessionGet(key) {
    let stringValue = sessionStorage.getItem(key)
      if (stringValue !== null) {
        let value = JSON.parse(stringValue)
          let expirationDate = new Date(value.expirationDate)
          if (expirationDate > new Date()) {
            console.log(expirationDate  + "  " +new Date());
            return value.value
          } else {
            sessionStorage.removeItem(key)
            sessionStorage.removeItem('token')
          }
      }
      return null
  }

  sessionSet(key, value, expirationInMin) {
    let expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 10);
      let newValue = {
      value: value,
      expirationDate: expirationDate.toISOString()
    }
    sessionStorage.setItem(key, JSON.stringify(newValue))
  }
}
