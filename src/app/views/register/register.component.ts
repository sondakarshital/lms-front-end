import { Component, OnInit } from '@angular/core';
import { UserDetail } from '../../domain/user-detail';
import { UserService } from '../../service/user-service/user.service';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from './register.validationService';
import { ControlMessagesComponent} from './register.controlMessages'

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styles: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  togglePassword: boolean;
  toggleConfirmPassword: boolean;
  registerForm: FormGroup;
  user: UserDetail = new UserDetail();
  invalidEmail = false;
  // registerForm: FormGroup;
  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  togglePasswordField(){
    this.togglePassword = !this.togglePassword;
  }
  toggleConfirmPasswordField(){
    this.toggleConfirmPassword = !this.toggleConfirmPassword;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['',[Validators.required,ValidationService.passwordValidator]],
      dob: ['',[Validators.required,ValidationService.dobFormatValidator,ValidationService.dobValidator]],
      confirmPassword: ['',[Validators.required,ValidationService.confirmPasswordValidator]],
      mob: ['',[Validators.required,ValidationService.mobValidator]],
      dept: ['',[Validators.required,ValidationService.deptValidator]],
      address: ['',[Validators.required]]
    });
  }

  createUser(): void {
    this.user = this.registerForm.value;
    console.log("this.registerForm ", this.user);
    this.userService.createUser(this.user)
      .subscribe(data => {
        alert("User created successfully.");
        this.router.navigate(['login']);
      });
  };
  
  verifyEmail(searchValue){
    var email = {
      email : searchValue
    }
    console.log("emailVal",searchValue);
    this.userService.verifyEmail(email).subscribe((data)=>{
      console.log("valid",data)
      this.invalidEmail = false;
    },err=>{
      console.log("err",err.error);
      this.invalidEmail = true;
      this.registerForm.controls['email'].setErrors({'incorrect': true});
    })
  }
}
