import { Component, OnInit } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { User } from '../../registration/user';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  maxDate: Date;
  genders: number[] = [0, 1];
  userId: string | null = "";

  newPassword: string = ""
  oldPassword: string = ""

  user = new User("", "", "", "", 0, "", "", "", "", "")

  nameForm = new FormControl('', [Validators.required]);
  surnameForm = new FormControl('', [Validators.required]);
  emailForm = new FormControl('', [Validators.required, Validators.email]);
  dateForm = new FormControl('', [Validators.required]);
  phoneForm = new FormControl('', [this.phoneNumberValidator()]);
  usernameForm = new FormControl('', [Validators.required]);

  newPasswordForm = new FormControl('', [Validators.required])
  oldPasswordForm = new FormControl('', [Validators.required])

  phoneNumberValidator(): ValidatorFn {
    return Validators.pattern('[- +()0-9]+');
  }

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.maxDate = new Date()
  }

  ngOnInit(): void {
    if (localStorage.getItem('userId') != null){

    }
    this.userId = localStorage.getItem('userId');
    this.userService.getUserData(this.userId!).subscribe((res:any) => {
      console.log(res);
     this.user.name = res.user.name
     this.user.surname = res.user.surname
     this.user.email = res.user.email
     this.user.birthDate = res.user.birthDate.split(" ")[0];
     this.user.phoneNumber = res.user.phoneNumber
     this.user.username = res.user.username
     this.user.gender =  Number(res.user.gender)
     this.user.bio = res.user.bio
    })
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

  edit() {
    this.userService.edit(this.user, this.userId!).subscribe(
      (data) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Successfully registrated',
            text: 'Here can login',
            timer: 3000,
            showConfirmButton: false,
          })
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

  editPassword(){
    this.userService.editPassword(this.newPassword, this.oldPassword, this.userId!).subscribe(
      (data) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Successfully registrated',
            text: 'Here can login',
            timer: 3000,
            showConfirmButton: false,
          })
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

}
