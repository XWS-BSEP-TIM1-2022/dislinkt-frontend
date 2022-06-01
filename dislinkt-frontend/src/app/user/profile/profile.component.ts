import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PostComment } from 'src/app/model/comment.model';
import { Reaction } from 'src/app/model/reaction.model';
import { User } from 'src/app/registration/user';
import { AuthService } from 'src/app/service/auth.service';
import { ConnectionService } from 'src/app/service/connection.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { CommentsDialogComponent } from './comments-dialog/comments-dialog.component';
import { LikesDialogComponent } from './likes-dialog/likes-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  idFromParams = '';
  user = new User("", "", "", "", 0, "", "", "", "", "", [], [], false, false);
  posts: any;
  connection = { isConnected: false, pendingConnection: false, isMessageNotificationEnabled: false, isPostNotificationEnabled: false, isCommentNotificationEnabled: false }


  constructor(private route: ActivatedRoute, private userService: UserService, private postService: PostService, public authService: AuthService, private connectionService: ConnectionService, public dialog: MatDialog, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.loadData();
    this.isUserBlocked()
    this.getConnection();
  }

  isUserBlocked() {
    this.connectionService.isBlockedAny(localStorage.getItem('userId')!, this.idFromParams).subscribe(
      (data: any) => {
        if (data.blocked) {
          this.router.navigate([''])
          return
        }
      },
      (error) => {
        this.router.navigate([''])
        return
      }
    )
  }

  getConnection() {
    this.connectionService.getConnection(localStorage.getItem('userId')!, this.idFromParams).subscribe(
      (data: any) => {
        this.connection = data
      },
      (error) => {

      }
    )
  }

  loadData() {
    this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.idFromParams = params['id'];
        this.userService.getUserData(this.idFromParams).subscribe(
          (data: any) => this.user = data.user
        );
        this.postService.getAllUserPosts(this.idFromParams).subscribe(
          (data: any) => {
            this.posts = data.posts;
            this.posts.forEach((post: any) => {
              post.like = false;
              post.dislike = false;
            });
          }
        );
      }
    });
  }

  openLikesDialog($event: Reaction[]) {
    const dialogRef = this.dialog.open(LikesDialogComponent, {
      data: $event
    });
  }

  openDislikesDialog($event: Reaction[]) {
    const dialogRef = this.dialog.open(LikesDialogComponent, {
      data: $event
    });
  }

  openCommentsDialog($event: PostComment[]) {
    const dialogRef = this.dialog.open(CommentsDialogComponent, {
      data: $event
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
  newConnection() {
    this.connectionService.newConnection(this.idFromParams).subscribe(
      (data: any) => {
        this.connection.isConnected = data.connection.isConnected
        this.connection.pendingConnection = data.connection.pendingConnection
        this.connection.isMessageNotificationEnabled = data.connection.isMessageNotificationEnabled
        this.connection.isPostNotificationEnabled = data.connection.isPostNotificationEnabled
        this.connection.isCommentNotificationEnabled = data.connection.isCommentNotificationEnabled
        if (this.connection.isConnected) {
          Swal.fire(
            {
              icon: 'success',
              title: "Successfully added connection",
              timer: 1000,
              showConfirmButton: false,
            })
        }
        else {
          if (this.connection.pendingConnection) {

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

  deleteConnection() {
    this.connectionService.deleteConnection(this.idFromParams).subscribe(
      (data: any) => {
        this.connection.isConnected = false
        this.connection.pendingConnection = false
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

  rejectConnection() {
    this.connectionService.rejectConnection(localStorage.getItem('userId'), this.idFromParams).subscribe(
      (data: any) => {
        this.connection.isConnected = false
        this.connection.pendingConnection = false
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

  block() {
    this.connectionService.block(localStorage.getItem("userId")!, this.idFromParams).subscribe(
      (data) => {
        Swal.fire(
          {
            icon: 'success',
            title: "Successfully blocked user with username: '" + this.user.username + "'",
            timer: 2000,
            showConfirmButton: false,
          })
        this.router.navigate([''])
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

  changeMessageNotification() {
    this.connectionService.changeMessageNotification(localStorage.getItem('userId')!, this.idFromParams).subscribe(
      (data) => {
        this.connection.isMessageNotificationEnabled = !this.connection.isMessageNotificationEnabled
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

  changePostNotification() {
    this.connectionService.changePostNotification(localStorage.getItem('userId')!, this.idFromParams).subscribe(
      (data) => {
        this.connection.isPostNotificationEnabled = !this.connection.isPostNotificationEnabled
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

  changeCommentNotification() {
    this.connectionService.changeCommentNotification(localStorage.getItem('userId')!, this.idFromParams).subscribe(
      (data) => {
        this.connection.isCommentNotificationEnabled = !this.connection.isCommentNotificationEnabled
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
