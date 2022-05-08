import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { User } from 'src/app/registration/user';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  idFromParams = '';
  user = new User("", "", "", "", 0, "", "", "", "", "", [], [], false);
  posts: any;

  constructor(private route: ActivatedRoute, private userService: UserService, private postService: PostService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
          this.idFromParams = params['id'];
          this.userService.getUserData(this.idFromParams).subscribe(
            (data:any) => this.user = data.user
          );
          this.postService.getAllUserPosts(this.idFromParams).subscribe(
            (data:any) => {this.posts = data.posts;
              console.log(data)}
          );
      } 
  });
  }



}
