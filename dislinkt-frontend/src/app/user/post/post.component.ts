import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { PostComment } from 'src/app/model/comment.model';
import { Post } from 'src/app/model/post.model';
import { Reaction } from 'src/app/model/reaction.model';
import { User } from 'src/app/registration/user';
import { PostService } from 'src/app/service/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post = new Post();
  @Input() user = new User("", "", "", "", 0, "", "", "", "", "", [], [], false, false);

  @Output() likesEvent = new EventEmitter<Reaction[]>();
  @Output() dislikesEvent = new EventEmitter<Reaction[]>();
  @Output() commentsEvent = new EventEmitter<PostComment[]>();

  postInputActive = false;
  textForm = new FormControl('');
  likes = [] as Reaction[];
  dislikes = [] as Reaction[];
  comments = [] as PostComment[];
  reactions = [] as Reaction[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getReactions();
    this.getComments();
  }

  getReactions() {
    this.postService.getAllReactionsFromPost(this.post.id).subscribe((data: any) => {
      this.reactions = data.reactions
      this.likes = this.reactions.filter(x => x.type === true);
      this.dislikes = this.reactions.filter(x => x.type === false);
    })
  }

  getComments() {
    this.postService.getAllCommentsFromPost(this.post.id).subscribe((data: any) => {
      this.comments = data.comments;
    })
  }

  likePost() {
    if (localStorage.getItem('userId') != null) {
      let reaction = new Reaction();
      reaction.postId = this.post.id;
      reaction.userId = localStorage.getItem('userId');
      reaction.type = true;
      this.postService.createReaction(reaction).subscribe((data) => {
        this.getReactions();
        this.postInputActive = false;
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

  dislikePost() {
    if (localStorage.getItem('userId') != null) {
      let reaction = new Reaction();
      reaction.postId = this.post.id;
      reaction.userId = localStorage.getItem('userId');
      reaction.type = false;
      this.postService.createReaction(reaction).subscribe((data) => {
        this.getReactions();
        this.postInputActive = false;
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

  createCommentPost() {
    if (localStorage.getItem('userId') != null) {
      let comment = new PostComment();
      comment.postId = this.post.id;
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
        this.getComments();
        this.postInputActive = false;
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

  commentPost() {
    this.postInputActive = !this.postInputActive;
  }

  get likesNumber() {
    return this.likes.length;
  }

  get dislikesNumber() {
    return this.dislikes.length;
  }

  get commentsNumber() {
    return this.comments.length;
  }

  get Liked() {
    if (localStorage.getItem('userId') != null) {
      return this.likes.find(x => x.userId == localStorage.getItem('userId')) == undefined;
    }
    return false;
  }

  get Disliked() {
    if (localStorage.getItem('userId') != null) {
      return this.dislikes.find(x => x.userId == localStorage.getItem('userId')) == undefined;
    }
    return false;
  }

  unLikePost() {
    let reaction = this.likes.find(x => x.userId == localStorage.getItem('userId'));
    this.postService.deleteReaction(reaction?.id).subscribe((data) => {
      this.getReactions();
      this.postInputActive = false;
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

  unDislikePost() {
    let reaction = this.likes.find(x => x.userId == localStorage.getItem('userId'));
    this.postService.deleteReaction(reaction?.id).subscribe((data) => {
      this.getReactions();
      this.postInputActive = false;
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

  openLikesDialog(){
    this.likesEvent.emit(this.likes);
  }

  openDislikesDialog(){
    this.dislikesEvent.emit(this.dislikes);
  }

  openCommentsDialog(){
    this.commentsEvent.emit(this.comments);
  }

}
