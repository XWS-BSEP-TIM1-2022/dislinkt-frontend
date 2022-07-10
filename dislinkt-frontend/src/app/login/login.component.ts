import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ""
  password = ""

  usernameForm = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  passwordForm = new FormControl('', [Validators.required]);

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getRole() != null) {
      this.router.navigate(['/'])
    }
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (data: any) => {
        localStorage.setItem('userId', data.userId)
        if(data.token == ""){
          this.router.navigate(['2fa'])
          return
        }
        console.log(data)
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.role)
        localStorage.setItem('email', data.email)
        localStorage.setItem('isPrivate', data.isPrivate)
        localStorage.setItem('username', data.username)
        Swal.fire(
          {
            icon: 'success',
            title: 'Successfully loged in',
            timer: 1000,
            showConfirmButton: false,
          })
        if (data.role == "USER") {
          this.router.navigate(['/'])
        }
        else {
          // TODO: redirect to admin home page
        }
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
  getUsernameErrorMessage() {
    return this.usernameForm.hasError('required') ? 'You must enter a value' :
      '';
  }

  getPasswordErrorMessage() {
    return this.passwordForm.hasError('required') ? 'You must enter a value' :
      '';
  }
}
