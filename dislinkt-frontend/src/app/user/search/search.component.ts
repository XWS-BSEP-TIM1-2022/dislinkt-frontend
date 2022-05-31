import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/registration/user';
import { AuthService } from 'src/app/service/auth.service';
import { ConnectionService } from 'src/app/service/connection.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  users: any
  searchParam: string | null | undefined
  connections: any


  constructor(private userService: UserService, public authService: AuthService, private connectionService: ConnectionService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    /*this.activatedRoute.queryParams.subscribe(params => {
      this.searchParam = params.searchParam
    })*/
    this.searchParam = localStorage.getItem('searchParam')

    this.search()
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
      }
    )
  }

  search() {
    if (this.searchParam != null) {
      localStorage.setItem('searchParam', this.searchParam)
      if (this.searchParam.length > 100) {
        Swal.fire(
          {
            icon: 'warning',
            title: "Search parameter is too long",
            timer: 1000,
            showConfirmButton: false,
          })
        return;
      }
      this.userService.searchUser(this.searchParam!).subscribe(
        (data: any) => {
          this.users = data.users

          if (this.authService.getRole() == "USER") {
            this.getConnections()
          }
        },
        (error) => {
          this.users = []
        })

    }
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
      (data)=>{
        Swal.fire(
          {
            icon: 'success',
            title: "Successfully blocked user with username: '" + user.username + "'",
            timer: 2000,
            showConfirmButton: false,
          })
        this.users = this.users.filter((u: { id: any; })=>u.id != user.id)
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
