import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ""
  password = ""

  usernameForm = new FormControl('', [Validators.required]);
  passwordForm = new FormControl('', [Validators.required]);

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (data: any) => {
        console.log(data)
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.role)
        localStorage.setItem('mailAddress', data.email)
        localStorage.setItem('userId', data.userId)
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
  getUsernameErrorMessage(){
    return this.usernameForm.hasError('required') ? 'You must enter a value' :
        '';
  }

  getPasswordErrorMessage(){
    return this.passwordForm.hasError('required') ? 'You must enter a value' :
        '';
  }
}
