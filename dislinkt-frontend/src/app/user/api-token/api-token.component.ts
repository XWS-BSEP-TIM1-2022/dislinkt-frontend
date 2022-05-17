import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ClipboardService } from 'ngx-clipboard';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-api-token',
  templateUrl: './api-token.component.html',
  styleUrls: ['./api-token.component.css']
})
export class ApiTokenComponent implements OnInit {

  apiToken = ""

  constructor(private authService: AuthService, private clipboardApi: ClipboardService) { }

  ngOnInit(): void {
    this.authService.getApiToken().subscribe(
      (data: any) => {
        this.apiToken = data.ApiToken
      },
      (error) => {
        this.apiToken = ""
      }
    )
  }

  copy() {
    this.clipboardApi.copyFromContent(this.apiToken)
    Swal.fire(
      {
        icon: 'success',
        title: 'Successfully copied api token',
        timer: 500,
        showConfirmButton: false,
      })
  }

  delete(){
    this.authService.removeApiToken().subscribe(
      (data: any) => {
        this.apiToken = ""
      },
      (error) => {
        this.apiToken = ""
      }
    )
  }

  create(){
    this.authService.createApiToken().subscribe(
      (data: any) => {
        this.apiToken = data.ApiToken
      },
      (error) => {
        this.apiToken = ""
      }
    )
  }
}
