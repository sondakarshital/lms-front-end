import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { ResponseContentType, RequestOptions } from '@angular/http';
import { AppGlobals } from '../../service/global';
import { UserDetail } from '../../domain/user-detail'


@Injectable({
  providedIn: 'root'
})

export class UserProfileService {
  url = "http://localhost:3000/users/";
  constructor(private httpClient: HttpClient, public sanitizer: DomSanitizer, private appGlobals: AppGlobals) { }
  userProfile(): any {
    return this.httpClient.get<UserDetail>(this.url + "me").subscribe(user => {
      this.appGlobals.profile = user;
      this.httpClient.get(this.url + "" + user["_id"] + "/avatar", {
        responseType: 'blob'
      })
        .pipe(
        map((res: any) => {
          const urlCreator = window.URL;
          return this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(res));
        })
        ).subscribe(avatar => {
          this.appGlobals.profile.avatar = avatar;
        }, err => {
          console.log("no profile pic found")
        });
    })
  }
  changeProfile(data){
    console.log("url ",this.url+"me/avatar");
    return this.httpClient.post<any>(this.url+"me/avatar",data);
  }
}
