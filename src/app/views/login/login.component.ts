import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { AppGlobals } from '../../service/global'

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  email = ''
  password = ''
  invalidLogin = false
  error = ''

  constructor(private router: Router, private loginservice: AuthenticationService, private appGlobals: AppGlobals) { }

  ngOnInit() {
  }

  checkLogin() {
    this.loginservice.authenticate(this.email, this.password).subscribe(
      data => {
        this.appGlobals.profile = data.user;
        console.log("data ",data);
        this.loginservice.userProfile(data.user._id).subscribe(avatar => {
          console.log("in login file", this.appGlobals.profile);
          this.appGlobals.profile.avatar = avatar;
        })
        //commented to route to upload page instead of dashboard
        this.router.navigate(['/dashboard'])
        //this.router.navigate(['/upload'])
        this.invalidLogin = false
      },
      error => {
        console.log(error);
        this.error = "Provided credentials are wrong";
        this.invalidLogin = true;
      }
    );
  }
}
