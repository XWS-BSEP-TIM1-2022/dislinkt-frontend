import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostComment } from '../model/comment.model';
import { Post } from '../model/post.model';
import { Reaction } from '../model/reaction.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }

  createPost(post: Post) {
    return this.http.post(environment.serverUrl + 'posts', post);
  }

  getAllUserPosts(userId: string){
    return this.http.get<Array<Post>>(environment.serverUrl + 'users/'+ userId +'/posts');
  }

  createReaction(reaction: Reaction){
    return this.http.post(environment.serverUrl + 'posts/'+ reaction.postId+ '/reactions', reaction);
  }

  createComment(comment: PostComment){
    return this.http.post(environment.serverUrl + 'posts/'+ comment.postId+ '/comments', comment);
  }

  getAllReactionsFromPost(postId: string){
    return this.http.get<Array<Reaction>>(environment.serverUrl + 'posts/'+ postId+ '/reactions');
  }

  getAllCommentsFromPost(postId: string){
    return this.http.get<Array<PostComment>>(environment.serverUrl + 'posts/'+ postId+ '/comments');
  }

  deleteReaction(reactionId?: string){
    return this.http.delete(environment.serverUrl + 'reactions/'+reactionId)
  }

  deleteComment(commentId?: string){
    return this.http.delete(environment.serverUrl + 'comments/'+commentId)
  }
}
