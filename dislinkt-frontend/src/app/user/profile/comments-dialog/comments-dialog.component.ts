import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostComment } from 'src/app/model/comment.model';
import { User } from 'src/app/registration/user';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import { LikesDialogComponent } from '../likes-dialog/likes-dialog.component';

@Component({
  selector: 'app-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrls: ['./comments-dialog.component.css']
})
export class CommentsDialogComponent implements OnInit {

  comments = [] as PostComment[];

  constructor(public dialogRef: MatDialogRef<LikesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostComment[], public userService: UserService, public postService: PostService) { }

  ngOnInit(): void {
    this.comments = this.data;
    this.comments.forEach(x => this.userService.getUserData(x.userId).subscribe((data:any) =>
    {
      x.user = data.user;
    }))
  }

  cancel(): void {
    this.dialogRef.close();
  }

  deleteComment(id: string){
    this.postService.deleteComment(id).subscribe(data =>{
      this.comments = this.comments.filter(x => x.id != id);
    });
  }

}
