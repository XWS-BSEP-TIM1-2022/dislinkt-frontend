import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ConnectionService } from 'src/app/service/connection.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {

  users: any
  usersId: any
  connections: any
  showLoadingIcon = true

  constructor(private userService: UserService, public authService: AuthService, private connectionService: ConnectionService, private router: Router) { }

  ngOnInit(): void {
    this.users = null
    this.usersId = null
    this.showLoadingIcon = true

    this.connectionService.getSuggestions(localStorage.getItem('userId')).subscribe(
      (data: any) => {
        this.usersId = data.suggestionUserIds

        this.getUsersDetails()
      },
      (error) => {
        this.users = []
        this.usersId = []
        this.showLoadingIcon = false
        if (error.error.message = "unauthorized") {
          this.authService.logout()
          this.router.navigate([''])
        }
      }
    )
  }
  getUsersDetails() {
    this.users = []
    for (const userId of this.usersId) {
      this.userService.getUserData(userId.userId).subscribe(
        (data: any) => {
          this.users.push(data.user)
        },
        (error) => {

        }
      )
    }

    this.showLoadingIcon = false

    this.getConnections()
  }
  getConnections() {
    this.connectionService.getAllByUserId(localStorage.getItem("userId")).subscribe(
      (data: any) => {
        this.connections = data.connections
        for (const user of this.users) {
          var connection = this.connections.filter((c: { connectedUserId: any; }) => c.connectedUserId == user.id)[0]
          if (connection == undefined || null) {
            user.isConnected = false
            user.pendingConnection = false
          }
          else {
            user.isConnected = connection.isConnected
            user.pendingConnection = connection.pendingConnection
          }
        }
      },
      (error) => {
        this.connections = []
        if (error.error.message = "unauthorized") {
          this.authService.logout()
          this.router.navigate([''])
        }
      }
    )
  }

  newConnection(user: any) {
    this.connectionService.newConnection(user.id).subscribe(
      (data: any) => {
        user.isConnected = data.connection.isConnected
        user.pendingConnection = data.connection.pendingConnection
        if (user.isConnected) {
          Swal.fire(
            {
              icon: 'success',
              title: "Successfully added connection",
              timer: 1000,
              showConfirmButton: false,
            })
        }
        else {
          if (user.pendingConnection) {

            Swal.fire(
              {
                icon: 'warning',
                title: "Successfully sended request",
                timer: 1000,
                showConfirmButton: false,
              })
          }
        }
        this.users = this.users.filter((u: { id: any; }) => u.id != user.id)
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

  deleteConnection(user: any) {
    this.connectionService.deleteConnection(user.id).subscribe(
      (data: any) => {
        user.isConnected = false
        user.pendingConnection = false
        Swal.fire(
          {
            icon: 'success',
            title: "Successfully removed connection",
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
      }

    )
  }

  rejectConnection(user: any) {
    this.connectionService.rejectConnection(localStorage.getItem('userId'), user.id).subscribe(
      (data: any) => {
        user.isConnected = false
        user.pendingConnection = false
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
      }

    )
  }

  openProfile(user: any) {
    this.router.navigate(['posts/' + user.id]);
  }

  block(user: any) {
    this.connectionService.block(localStorage.getItem("userId")!, user.id).subscribe(
      (data) => {
        Swal.fire(
          {
            icon: 'success',
            title: "Successfully blocked user with username: '" + user.username + "'",
            timer: 2000,
            showConfirmButton: false,
          })
        this.users = this.users.filter((u: { id: any; }) => u.id != user.id)
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
