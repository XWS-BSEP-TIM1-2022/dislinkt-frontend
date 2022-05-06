import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { User } from './user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  maxDate: Date;
  genders: number[] = [0, 1];

  newPassword: string = ""
  oldPassword: string = ""

  user = new User("", "", "", "", 0, "", "", "", "", "", [], [], false)

  nameForm = new FormControl('', [Validators.required]);
  surnameForm = new FormControl('', [Validators.required]);
  emailForm = new FormControl('', [Validators.required, Validators.email]);
  dateForm = new FormControl('', [Validators.required]);
  phoneForm = new FormControl('', [this.patternValidator('[- +()0-9]+', { phoneNumber: true })]);
  usernameForm = new FormControl('', [Validators.required]);
  passwordForm = new FormControl('', [Validators.required, Validators.minLength(8), this.patternValidator('[0-9]', { hasNumber: true }), this.patternValidator('[A-Z]', { hasUpperCase: true }), this.patternValidator('[a-z]', { hasLowerCase: true }), this.patternValidator("[.,<>/?|';:!@#$%^&*()_+=-]", { hasSpecial: true }), this.commonPasswordsValidator()]);
  confirmPasswordForm = new FormControl('', [Validators.required, this.equalsToPasswordValidator()]);
  commonPasswords = ['']
  foundCommonPass: any;

  commonPasswordsValidator(): ValidatorFn {
    if (this.commonPasswords == undefined)
      this.commonPasswords = ['']
    return (control: AbstractControl): { [key: string]: any } | null =>
      (!this.containts(control.value)) ? null : { commonPassword: true }

  }

  equalsToPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      control.value?.toLowerCase() == this.user.password.toLowerCase() ? null : { passwordsNotEqual: true };
  }

  patternValidator(regex: string, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null as any;
      }
      const valid = RegExp(regex).test(control.value);
      return valid ? null as any : error;
    };
  }

  constructor(private userService: UserService, private authService: AuthService, private router: Router, private http: HttpClient) {
    this.maxDate = new Date()
  }

  ngOnInit(): void {
    if (this.authService.getRole() != null) {
      this.router.navigate(['/'])
    }
    this.http.get('assets/common_passwords.txt', { responseType: 'text' }).subscribe(
      (data) => {
        this.commonPasswords = data.split(/[\r\n]+/)
      }
    )
  }

  register() {
    this.userService.register(this.user).subscribe(
      (data) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Successfully registrated',
            text: 'Here can login',
            timer: 3000,
            showConfirmButton: false,
          })
        this.router.navigate(['/login'])
      },
      (error) => {

        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 3000,
            showConfirmButton: false,
          })
      }
    )
  }



  getnameErrorMessage() {
    return this.usernameForm.hasError('required') ? 'You must enter a value' :
      '';
  }

  getsurnameErrorMessage() {
    return this.surnameForm.hasError('required') ? 'You must enter a value' :
      '';
  }


  getEmailErrorMessage() {
    return this.emailForm.hasError('required') ? 'You must enter a value' :
      this.emailForm.hasError('email') ? 'Not a valid email' :
        '';
  }

  getDateErrorMessage() {
    return this.dateForm.hasError('required') ? 'You must enter a value' :
      '';
  }

  getPhoneErrorMessage() {
    return this.phoneForm.hasError('validators') ? '' :
      'Phone number not in correct format';
  }

  getUsernameErrorMessage() {
    return this.usernameForm.hasError('required') ? 'You must enter a value' :
      '';
  }

  getPasswordErrorMessage() {
    return this.passwordForm.hasError('required') ? 'You must enter a value' :
      this.passwordForm.hasError('minlength') ? 'Must be atleast 8 characters' :
        this.passwordForm.hasError('hasNumber') ? 'Must contain atleast 1 number' :
          this.passwordForm.hasError('hasUpperCase') ? 'Must contain 1 upper case' :
            this.passwordForm.hasError('hasLowerCase') ? 'Must contain 1 lower case' :
              this.passwordForm.hasError('hasSpecial') ? 'Must contain 1 special characher' :
                this.passwordForm.hasError('commonPassword') ? 'Must not be a common password or containts common. (' + this.foundCommonPass + ')' :
                  '';
  }

  getConfirmPasswordErrorMessage() {
    return this.confirmPasswordForm.hasError('required') ? 'You must enter a value' :
      'Passwords must match';
  }
  containts(value: any) {
    for (const pass of this.commonPasswords) {
      if (pass.includes(value) || value.includes(pass)) {
        this.foundCommonPass = pass
        return true
      }
    }
    return false
  }
}