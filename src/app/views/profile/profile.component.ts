import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../service/global'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {UserDetail} from '../../domain/user-detail'
import {UserProfileService} from '../../service/user-service/user-profile.service'

//Alert imports
import { AlertConfig } from 'ngx-bootstrap/alert';

// such override allows to keep some initial values

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  imageurl;
  imagePath;
  invalidMobile = false;
  isUpdated = false;
  profileForm: FormGroup;
  user :UserDetail;
  dismissible = true;
  constructor(private appGlobals: AppGlobals, private userProfileService: UserProfileService) { 
   //this.userProfileService.userProfile();
    this.imageurl = "../../../assets/img/avatars/bodybuilder.jpg"
    var profile = this.appGlobals.profile;
    this.profile(profile);
    if (this.appGlobals.profile.avatar) {
      this.imageurl = this.appGlobals.profile.avatar;
    }
  }

  ngOnInit() {

  }
  profile(profile) {
    console.log("user ", profile);
    var user = profile;
    this.profileForm = new FormGroup({
      'username': new FormControl(user.name, Validators.required),
      'email': new FormControl(user.email),
      'dob': new FormControl(user.dob),
      'mob': new FormControl(user.mob),
      'dept': new FormControl(user.dept),
      'address': new FormControl(user.address,Validators.required)
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imageurl = reader.result;
      }
      const formData = new FormData();
      formData.append('avatar', event.target.files[0]);
      this.userProfileService.changeProfile(formData).subscribe(data=>{
        console.log("file uploaded successfully");
      },err=>{
        console.log("err uploading file");
      })
    }
  }
  mobileNoValidator(value){
    if (value.match(/^([+]\d{2})?\d{10}$/)) {
      this.invalidMobile = false;
    } else {
      this.invalidMobile = true;
      this.profileForm.controls['mob'].setErrors({'incorrect': true});
    }
  };
  updateProfile(){
    this.user = this.profileForm.value;
    console.log("user",this.user);
    var update = {
      mob : this.profileForm.value.mob,
      address : this.profileForm.value.address
    }
    console.log("update ",update);
    this.userProfileService.updateUser(update).subscribe(data=>{
      this.appGlobals.profile.mob = update.mob;
      this.appGlobals.profile.address = update.address;
      this.isUpdated  =  true;
      console.log("updated data ",data);
    },err=>{
      console.log("error in updating the profile",err);
    })
}
}
