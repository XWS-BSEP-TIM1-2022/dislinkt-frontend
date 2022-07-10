import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-magic-link',
  templateUrl: './magic-link.component.html',
  styleUrls: ['./magic-link.component.css']
})
export class MagicLinkComponent implements OnInit {

  userIdFromRoute = '';
  requestIdFromRoute ='';

  constructor(private route: ActivatedRoute, private service: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userIdFromRoute = params['userId'];
      this.requestIdFromRoute = params['requestId'];
      this.activateLink(this.userIdFromRoute, this.requestIdFromRoute);
    });
  }

  activateLink(userId: string, requestId: string){
    this.service.activateLinkForLogin(userId, requestId).subscribe((data: any) => {
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
    })
  }

}
