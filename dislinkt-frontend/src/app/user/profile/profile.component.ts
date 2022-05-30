import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PostComment } from 'src/app/model/comment.model';
import { Reaction } from 'src/app/model/reaction.model';
import { User } from 'src/app/registration/user';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
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

  constructor(private route: ActivatedRoute, private userService: UserService, private postService: PostService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
          this.idFromParams = params['id'];
          this.userService.getUserData(this.idFromParams).subscribe(
            (data:any) => this.user = data.user
          );
          this.postService.getAllUserPosts(this.idFromParams).subscribe(
            (data:any) => {
              this.posts = data.posts;
              this.posts.forEach((post: any) => {
                post.like = false;
                post.dislike = false;
              });}
          );
      } 
  });
  }

  openLikesDialog($event: Reaction[]){
    const dialogRef = this.dialog.open(LikesDialogComponent, {
      data: $event
    });
  }

  openDislikesDialog($event: Reaction[]){
    const dialogRef = this.dialog.open(LikesDialogComponent, {
      data: $event
    });
  }

  openCommentsDialog($event: PostComment[]){
    const dialogRef = this.dialog.open(CommentsDialogComponent, {
      data: $event
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
}
