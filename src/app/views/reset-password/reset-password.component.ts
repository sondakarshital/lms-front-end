import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{ResetPasswordService} from '../../service/user-service/reset-password'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  password : "";
  token = "";
  userid = "";
  message = "";
  showMessage = false;
  errorMessage = "";
  showErrMessage = false;
  constructor(private activeRoute: ActivatedRoute,public resetPasswordService : ResetPasswordService) {
    activeRoute.queryParams
      .subscribe((params) => {
        console.log(params);
        this.token = params.token;
        this.userid = params.userid;
      });
  }

  ngOnInit() {
  }
  changePassword(){
    var user = {
      password:this.password,
      userid : this.userid
    }
    this.resetPasswordService.newPassword(user,this.token).subscribe((data)=>{
      this.message = "Your password changed successfully ";
      this.showMessage = true;
      this.showErrMessage = false;
    },err=>{
      console.log("errorMessage",err.error.message)
      this.errorMessage =  err.error.message;
      this.showErrMessage = true;
      this.showMessage = false;
    })
  }
}
