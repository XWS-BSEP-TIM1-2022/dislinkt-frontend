import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/service/connection.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.css']
})
export class BlockedComponent implements OnInit {
  displayedColumns: string[] = ['username', 'name', 'surname', 'email'];
  users = Array<any>();
  usersId = Array<any>();

  constructor(private userService: UserService, private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.connectionService.getBlockedUsersId(localStorage.getItem('userId')!).subscribe(
      (data: any) => {
        this.users = []
        this.usersId = data.usersId

        for (const userId of this.usersId) {
          this.getBlockedUserData(userId)
        }



      },
      (error) => {
        this.users = []
      }
    )
  }
  getBlockedUserData(userId: any) {
    this.userService.getUserData(userId).subscribe(
      (data: any) => {
        this.users.push(data.user)
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
    console.log(this.users)
  }

  unblock(userId:string){
    this.connectionService.unblock(localStorage.getItem('userId')!, userId).subscribe(
      (data)=>{
        this.users = this.users.filter(u=>u.id != userId)
      },
      (error)=>{
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
