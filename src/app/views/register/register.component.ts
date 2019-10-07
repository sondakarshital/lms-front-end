import { Component, OnInit } from '@angular/core';
import { UserDetail } from '../../domain/user-detail';
import { UserService } from '../../service/user-service/user.service';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styles: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: UserDetail = new UserDetail();
  invalidEmail = false;
  // registerForm: FormGroup;
  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      "name": new FormControl(null, Validators.required),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null),
      "dob": new FormControl(null),
      "confirmPassword": new FormControl(null),
      "age": new FormControl(null)
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
    })
  }

}
