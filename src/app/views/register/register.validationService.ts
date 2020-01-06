
import { UserService } from '../../service/user-service/user.service';
export class ValidationService {
  constructor(public userService: UserService) { }
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
      let config = {
        'required': 'Required',
        'invalidEmailAddress': 'Invalid email address',
        'invalidmob': 'Invalid mobile no',
        'invalidDob': 'Invalid Date format.Please enter date in DD/MM/YYYY format',
        'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
        'InvalidConfirmPassword': 'Confirm password and Password are not same',
        "invalidDept" : "Select one department",
        "adultCheck" : "Should be 18 year old",
        'minlength': `Minimum length ${validatorValue.requiredLength}`
      };
  
      return config[validatorName];
    }
  
    static emailValidator(control) {
      // RFC 2822 compliant regex
      if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        return false;
      } else {
        return { 'invalidEmailAddress': true };
      }
    }

    static mobValidator(control) {
      // RFC 2822 compliant regex
      if (control.value.match(/^([+]\d{2})?\d{10}$/)) {
        return null;
      } else {
        return { 'invalidmob': true };
      }
    }

     static validEmailValidator() {
      // RFC 2822 compliant regex
      return { 'invalidEmailAddress': true };
    }
  
    static passwordValidator(control) {
      // {6,100}           - Assert password is between 6 and 100 characters
      // (?=.*[0-9])       - Assert a string has at least one number
      if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
        return null;
      } else {
        return { 'invalidPassword': true };
      }
    }

    static dobFormatValidator(control){
      if (control.value.match(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)) {
        return null;
      } else {
        return { 'invalidDob': true };
      }
    }

    static dobValidator(control){
      console.log("control.value",control.value);
      var currentDate = new Date();
      var dob = new Date(control.value);
      console.log(currentDate.getFullYear()-dob.getFullYear());
      if(currentDate.getFullYear()-dob.getFullYear()<18){
        return { 'adultCheck' : true};
      }else{
        return null;
      }
    }

    static confirmPasswordValidator(control){
      // console.log("fileld",control.parent.value)
      if(control.parent){
        if(control.value == control.parent.value.password){
          return null;
        }else{
          return { 'InvalidConfirmPassword': true };
        }
      }
    }
    
    static deptValidator(control){
        if(control.value == "0"){
          return { 'invalidDept': true };
        }else{
          return null;
        }
      }
  }