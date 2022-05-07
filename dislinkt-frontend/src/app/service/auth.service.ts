import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post(environment.serverUrl + 'auth/login', { username: username, password: password });
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('email')
    localStorage.removeItem('userId')
    this.router.navigate([''])
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isPrivate() {
    return localStorage.getItem('isPrivate');
  }

  getQR2fa() {
    return this.http.put(environment.serverUrl + 'auth/getQR2fa/' + localStorage.getItem("userId"), null);
  }


  enable2fa(code: string) {
    return this.http.put(environment.serverUrl + 'auth/enable2fa', { userId: localStorage.getItem("userId"), code: code });
  }

  verify2fa(code: string) {
    return this.http.post(environment.serverUrl + 'auth/verify2fa', { userId: localStorage.getItem("userId"), code: code });
  }

  disable2fa() {
    return this.http.put(environment.serverUrl + 'auth/disable2fa/' + localStorage.getItem("userId"), null);
  }

}
