import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-two-fa',
  templateUrl: './two-fa.component.html',
  styleUrls: ['./two-fa.component.css']
})
export class TwoFAComponent implements OnInit {

  code = ""

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  verify() {
    this.authService.verify2fa(this.code).subscribe(
      (data: any) => {
        localStorage.setItem('userId', data.userId)
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.role)
        localStorage.setItem('email', data.email)
        localStorage.setItem('isPrivate', data.isPrivate)
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
}
