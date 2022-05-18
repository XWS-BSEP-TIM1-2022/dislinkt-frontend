import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  username = ""
  usernameForm = new FormControl('', [Validators.required]);

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  requestForPasswordRecovery(): void {
    this.userService.requestForPasswordRecovery(this.username).subscribe(
      (success) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Check your email, we send you link for password recovery',
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

  getUsernameErrorMessage() {
    return this.usernameForm.hasError('required') ? 'You must enter a value' :
      '';
  }
}
