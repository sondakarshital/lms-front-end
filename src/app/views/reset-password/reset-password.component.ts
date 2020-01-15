import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordService } from '../../service/user-service/reset-password'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  password: "";
  confirmPassword: "";
  token = "";
  userid = "";
  message = "";
  showMessage = false;
  errorMessage = "";
  showErrMessage = false;
  constructor(private activeRoute: ActivatedRoute, public resetPasswordService: ResetPasswordService) {
    activeRoute.queryParams
      .subscribe((params) => {
        console.log(params);
        this.token = params.token;
        this.userid = params.userid;
      });
  }

  ngOnInit() {
  }
  changePassword() {
    console.log("inside changePassword",this.password,this.confirmPassword)
    if (this.passwordCheck(this.password)&&this.passwordConfirmPasswordCheck(this.password,this.confirmPassword)){
      var user = {
        password: this.password,
        userid: this.userid
      }
      this.resetPasswordService.newPassword(user, this.token).subscribe((data) => {
        this.message = "Your password changed successfully ";
        this.showMessage = true;
        this.showErrMessage = false;
        this.password =this.confirmPassword = "";
      }, err => {
        console.log("errorMessage", err.error.message)
        this.errorMessage = err.error.message;
        this.showErrMessage = true;
        this.showMessage = false;
      })
    }
  }
  passwordCheck(password) {
    if (password.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return true;
    } else {
      console.log("here");
      this.errorMessage = "Invalid password. Password must be at least 6 characters long, and contain a number."
      this.showErrMessage = true;
      this.showMessage = false;
      return false;
    }
  }
  passwordConfirmPasswordCheck(password, confirmPassword) {
    if (password == confirmPassword) {
      return true;
    } else {
      this.errorMessage = "Password and ConfirmPassword should be same";
      this.showErrMessage = true;
      this.showMessage = false;
      return false;
    }

  }
}

