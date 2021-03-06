import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Experience } from '../model/experience.model';
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
    return this.http.put(environment.serverUrl + 'users/' + id, user)
  }

  getUserData(userId: string | null) {
    return this.http.get(environment.serverUrl + 'users/' + userId);
  }

  searchUser(searchParam: string) {
    return this.http.get(environment.serverUrl + 'users/search?searchParam=' + searchParam)
  }

  editUsername(newPassword: any, id: any) {
    var body = {
      "userId": id,
      "username": newPassword,
    }
    return this.http.put(environment.serverUrl + 'users/change-username', body)
  }

  editPassword(newPassword: any, confirmNewPassword: any, oldPassword: any, id: any) {
    var body = {
      "userId": id,
      "password": newPassword,
      "confirmNewPassword": confirmNewPassword,
      "oldPassword": oldPassword
    }
    return this.http.put(environment.serverUrl + 'users', body)
  }

  getExperiences(userId: string) {
    return this.http.get(environment.serverUrl + 'users/experience/' + userId)
  }

  addNewExperience(experience: Experience) {
    return this.http.post(environment.serverUrl + 'users/experience', experience)
  }

  deleteExperience(experienceId: string) {
    return this.http.delete(environment.serverUrl + 'users/experience/' + experienceId)
  }

  addNewSkill(newSkill: string, userId: string){
    var body = {
      "userId" : userId,
      "skill" : newSkill
    }
    return this.http.put(environment.serverUrl + 'users/newSkill', body)
  }

  addNewInterest(newInterest: string, userId: string){
    var body = {
      "userId" : userId,
      "interest" : newInterest
    }
    return this.http.put(environment.serverUrl + 'users/newInterest', body)
  }

  deleteSkill(userId: string, skill: string){
    return this.http.delete(environment.serverUrl + "users/removeSkill/" + userId + '/' + skill);
  }

  deleteInterest(userId: string, interest: string){
    return this.http.delete(environment.serverUrl + "users/removeInterest/" + userId + '/' + interest);
  }

  requestForPasswordRecovery(username: string) {
    return this.http.get(environment.serverUrl + 'users/auth/password-recovery/' + username);
  }

  recoverPassword(newPassword: string, confirmedNewPassword: string, passwordRecoveryRequestId: string) {
    var body = {
      "newPassword": newPassword,
      "confirmPassword": confirmedNewPassword
    }
    return this.http.put(environment.serverUrl + 'users/password-recovery/' + passwordRecoveryRequestId, body)
  }

  changePrivacy(userId: string) {
    return this.http.put(environment.serverUrl + 'users/privacy/' + userId, null)
  }
}
