import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostComment } from 'src/app/model/comment.model';
import { Post } from 'src/app/model/post.model';
import { Reaction } from 'src/app/model/reaction.model';
import { User } from 'src/app/registration/user';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  idFromParams = '';
  user = new User("", "", "", "", 0, "", "", "", "", "", [], [], false, false);
  posts: any;
  textForm = new FormControl('');
  postInputActive = '';

  constructor(private route: ActivatedRoute, private userService: UserService, private postService: PostService) { }

  ngOnInit(): void {
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

  likePost(id: any){
    if (localStorage.getItem('userId') != null) {
    let reaction = new Reaction();
    reaction.postId = id;
    reaction.userId = localStorage.getItem('userId');
    reaction.type = true;
    this.postService.createReaction(reaction).subscribe((data) => {
      Swal.fire(
        {
          icon: 'success',
          title: 'Successfully liked',
          timer: 3000,
          showConfirmButton: false,
        })
        this.postInputActive = ''
        this.textForm = new FormControl('');
    },
    (error) => {
      Swal.fire(
        {
          icon: 'error',
          title: error.error.message,
          timer: 3000,
          showConfirmButton: false,
        })
    });
    }
  }

  dislikePost(id: any){
    if (localStorage.getItem('userId') != null) {
      let reaction = new Reaction();
      reaction.postId = id;
      reaction.userId = localStorage.getItem('userId');
      reaction.type = false;
      this.postService.createReaction(reaction).subscribe((data) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Successfully disliked',
            timer: 3000,
            showConfirmButton: false,
          })
          this.postInputActive = ''
          this.textForm = new FormControl('');
      },
      (error) => {
        Swal.fire(
          {
            title: error.error.message,
            timer: 3000,
            showConfirmButton: false,
          })
      });
      }
  }

  createCommentPost(id: any){
    if (localStorage.getItem('userId') != null) {
      let comment = new PostComment();
      comment.postId = id;
      comment.userId = localStorage.getItem('userId');
      comment.text = this.textForm.value;
      this.postService.createComment(comment).subscribe((data) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Successfully created comment',
            timer: 3000,
            showConfirmButton: false,
          })
          this.postInputActive = ''
          this.textForm = new FormControl('');
      },
      (error) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 3000,
            showConfirmButton: false,
          })
      });
      }
  }

  commentPost(id: any){
    this.postInputActive = id;
  }

}
