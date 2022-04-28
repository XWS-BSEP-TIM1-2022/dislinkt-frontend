import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/service/connection.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  connections: any

  constructor(private connectionService: ConnectionService, private userService: UserService) { }

  ngOnInit(): void {
    this.getRequestsConnections()
  }

  getRequestsConnections() {
    this.connectionService.getRequestsConnections().subscribe(
      (data: any) => {
        this.connections = data.connections
        this.getUsersForConnections()
      },
      (error) => {
        this.connections = []
      }
    )
  }
  getUsersForConnections() {
    for (const connection of this.connections) {
      this.userService.getUserData(connection.userId).subscribe(
        (data:any)=>{
          connection.name = data.user.name
          connection.surname = data.user.surname
        },
        ()=>{

        }
      )
    }
  }

  approveConnection(connection: any) {
    this.connectionService.approveConnection(connection.userId, connection.connectedUserId).subscribe(
      (data: any) => {
        this.connections = this.connections.filter((c: { userId: any; connectedUserId: any; })=>c.userId != connection.userId && c.connectedUserId != connection.connectedUserId)
        Swal.fire(
          {
            icon: 'success',
            title: "Successfully approved connection request",
            timer: 1000,
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
      })
  }

  rejectConnection(connection: any) {
    this.connectionService.rejectConnection(connection.userId, connection.connectedUserId).subscribe(
      (data: any) => {
        this.connections = this.connections.filter((c: { userId: any; connectedUserId: any; })=>c.userId != connection.userId && c.connectedUserId != connection.connectedUserId)
        Swal.fire(
          {
            icon: 'success',
            title: "Successfully removed connection request",
            timer: 1000,
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
      })
  }

}
