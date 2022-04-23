import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
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

  user = new User("", "", "", "", 0, "", "", "", "", "")

  nameForm = new FormControl('', [Validators.required]);
  surnameForm = new FormControl('', [Validators.required]);
  emailForm = new FormControl('', [Validators.required, Validators.email]);
  dateForm = new FormControl('', [Validators.required]);
  phoneForm = new FormControl('', [this.phoneNumberValidator()]);
  usernameForm = new FormControl('', [Validators.required]);
  passwordForm = new FormControl('', [Validators.required]);
  confirmPasswordForm = new FormControl('', [Validators.required, this.equalsToPasswordValidator()]);

  equalsToPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      control.value?.toLowerCase() == this.user.password ? null : { wrongColor: control.value };
  }

  phoneNumberValidator(): ValidatorFn {
    return Validators.pattern('[- +()0-9]+');
  }

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.maxDate = new Date()
  }

  ngOnInit(): void {
    if (this.authService.getRole() != null) {
      this.router.navigate(['/'])
    }
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
      '';
  }

  getConfirmPasswordErrorMessage() {
    return this.confirmPasswordForm.hasError('required') ? 'You must enter a value' :
      'Passwords must match';
  }
}
