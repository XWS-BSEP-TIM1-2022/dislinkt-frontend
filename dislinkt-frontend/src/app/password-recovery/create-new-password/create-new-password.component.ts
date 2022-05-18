import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.css']
})
export class CreateNewPasswordComponent implements OnInit {

  newPassword: string = ""
  confirmNewPassword: string = ""
  passwordRecoveryRequestId: string = ""

  newPasswordForm = new FormControl('', [Validators.required])
  confirmPasswordForm = new FormControl('', [Validators.required, this.equalsToPasswordValidator()]);
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.passwordRecoveryRequestId = params['id'];
    });
  }

  equalsToPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      control.value?.toLowerCase() == this.newPassword.toLowerCase() ? null : { passwordsNotEqual: true };
  }

  getEmptyFieldErrorMessage() {
    return this.newPasswordForm.hasError('required') ? 'You must enter a value' :
      '';
  }

  getConfirmPasswordErrorMessage() {
    return this.confirmPasswordForm.hasError('required') ? 'You must enter a value' :
      'Passwords must match';
  }

  recoverPassword() {
    this.userService.recoverPassword(this.newPassword, this.confirmNewPassword, this.passwordRecoveryRequestId).subscribe(
      (data) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Password succefully changed',
            text: 'Here can login',
            timer: 5000,
            showConfirmButton: false,
          })
      },
      (error) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 5000,
            showConfirmButton: false,
          })
      }
    )
  }
}
