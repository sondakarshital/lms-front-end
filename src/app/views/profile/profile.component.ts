import { Component, OnInit } from '@angular/core';
import { AppGlobals} from '../../service/global'
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  imageurl;
  profileForm: FormGroup;

  constructor(private appGlobals : AppGlobals,private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.imageurl = "../../../assets/img/avatars/bodybuilder.jpg"
    let  profile = this.appGlobals.profile;
    var  avatar =this.appGlobals.avatar;
    this.profile(profile);
    // if(profile){
    //   this.imageurl = this.imageFormatter(avatar) ;
    //   console.log("this.imageurl ",this.imageurl);
    // }
  }

  imageFormatter(imageBuffer){
    // Converts arraybuffer to typed array object
    const TYPED_ARRAY = new Uint8Array(imageBuffer);
    
    // converts the typed array to string of characters
      const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
    
    //converts string of characters to base64String
      let base64String = btoa(STRING_CHAR);
    
    //sanitize the url that is passed as a value to image src attrtibute
      return this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String); 
  }

  profile(profile){
    var user = profile.user;
    console.log("user ",user);
    this.profileForm = new FormGroup({
      'username': new FormControl(user.name, Validators.required),
      'email': new FormControl(user.email),
      'age': new FormControl(user.age)
    });
  }

}
