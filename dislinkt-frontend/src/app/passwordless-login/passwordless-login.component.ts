import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-passwordless-login',
  templateUrl: './passwordless-login.component.html',
  styleUrls: ['./passwordless-login.component.css']
})
export class PasswordlessLoginComponent implements OnInit {


  username = ""

  usernameForm = new FormControl('', [Validators.required, Validators.pattern(/^\w+$/i)]);

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getRole() != null) {
      this.router.navigate(['/'])
    }
  }

  getUsernameErrorMessage() {
    return this.usernameForm.hasError('required') ? 'You must enter a value' :
      '';
  }

  sendLink(){
    this.authService.sendLinkForLogin(this.username).subscribe(
      (data: any) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Link was sent to your email adress',
            timer: 3000,
            showConfirmButton: false,
          })
      },
      (error) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 1000,
            showConfirmButton: false,
          })
      }
    )
  }

}
