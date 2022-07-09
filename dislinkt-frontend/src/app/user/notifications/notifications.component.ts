import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications:any

  constructor(private messageService:MessageService, private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.messageService.getAllUserNotifications(localStorage.getItem('userId')!).subscribe(
      (data:any)=>{
        this.notifications = data.notifications
      },
      (error)=>{
        if(error.error.message=='unauthorized'){
          this.authService.logout()
          this.router.navigate([''])
        }
        this.notifications = []
      }
    )
  }

}
