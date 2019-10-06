import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { AppGlobals} from '../../service/global'

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  email = ''
  password = ''
  invalidLogin = false
  error = ''

  constructor(private router: Router,private loginservice: AuthenticationService,private appGlobals : AppGlobals) { }

  ngOnInit() {
  }

  checkLogin() {
    this.loginservice.authenticate(this.email, this.password).subscribe(
      data => {
        this.appGlobals.profile = data;
        
        // this.loginservice.userProfile(data.user._id).subscribe(avatar=>{
        //   console.log("profile image",data.user);
        //   this.appGlobals.profile.avatar = avatar;
        //   this.appGlobals.profile = data.user;
        // })
        this.router.navigate(['/dashboard'])
        this.invalidLogin = false
      },
      error => {
        console.log(error);
        this.error = "Seems like you have provided wrong credentials";
        this.invalidLogin = true;
      }
    );
  }
}
