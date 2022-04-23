import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../registration/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(environment.serverUrl + 'users', user)
  }

  edit(user: User, id: string) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `${localStorage.getItem('token')}`)
    }
    return this.http.put(environment.serverUrl + 'users/' + id, user, header)
  }

  getUserData(userId: string){
    return this.http.get(environment.serverUrl + 'users/' + userId);
  }

  searchUser(searchParam: string){
    return this.http.get(environment.serverUrl + 'users/search?searchParam=' + searchParam)
  }

  editPassword(newPassword: any, oldPassword: any, id: any) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `${localStorage.getItem('token')}`)
    }
    var body = {
        "userId": id,
        "password": newPassword,
        "oldPassword": oldPassword
      }
    return this.http.put(environment.serverUrl + 'users', body, header)
  }
}
