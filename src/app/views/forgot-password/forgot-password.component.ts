import { Component, OnInit } from '@angular/core';
import{ResetPasswordService} from '../../service/user-service/reset-password'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public resetPasswordService : ResetPasswordService) { }
  email : "";
  message = "";
  showMessage = false;
  errorMessage = "";
  showErrMessage = false;
  ngOnInit() {
  }

  resetPassword(){
    var userEmail ={
        email :this.email
    }
    this.resetPasswordService.resetPassword(userEmail).subscribe((data)=>{
      console.log("data",data);
      this.message = "Your password reset link is sent to "+this.email;
      this.showMessage = true;
      this.showErrMessage = false;
      this.email = "";
    },err=>{
      console.log("errorMessage",err.error.message)
      this.errorMessage =  err.error.message;
      this.showErrMessage = true;
      this.showMessage = false;
    })
  }
}
