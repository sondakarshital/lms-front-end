import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../service/global'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {UserDetail} from '../../domain/user-detail'
import {UserProfileService} from '../../service/user-service/user-profile.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  imageurl;
  imagePath;
  profileForm: FormGroup;
  user :UserDetail;
  constructor(private appGlobals: AppGlobals, private userProfileService: UserProfileService) { 
   this.userProfileService.userProfile();
    this.imageurl = "../../../assets/img/avatars/bodybuilder.jpg"
    var profile = this.appGlobals.profile;
    var avatar = this.appGlobals.profile.avatar;
    this.profile(profile);
    if (avatar) {
      this.imageurl = avatar;
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
      'age': new FormControl(user.age),
      'dob': new FormControl(user.dob),
      'mob': new FormControl(user.mob),
      'dept': new FormControl(user.dept),
      'address': new FormControl(user.address)
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
}
