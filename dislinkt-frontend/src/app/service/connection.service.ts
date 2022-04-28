import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  constructor(private http: HttpClient) { }

  getAllByUserId(userId: any) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `${localStorage.getItem('token')}`)
    }
    return this.http.get(environment.serverUrl + 'connections/all/' + userId, header)
  }

  newConnection(connectedUserId: any) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `${localStorage.getItem('token')}`)
    }
    return this.http.post(environment.serverUrl + 'connections', { userId: localStorage.getItem("userId"), connectedUserId: connectedUserId }, header)
  }

  rejectConnection(userId:any, connectedUserId: any) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `${localStorage.getItem('token')}`)
    }
    return this.http.put(environment.serverUrl + 'connections/reject', { userId: userId, connectedUserId: connectedUserId }, header)
  }

  approveConnection(userId: any, connectedUserId: any) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `${localStorage.getItem('token')}`)
    }
    return this.http.put(environment.serverUrl + 'connections/approve', { userId: userId, connectedUserId: connectedUserId }, header)
  }

  deleteConnection(connectedUserId: any) {
    var userId = localStorage.getItem("userId")
    if (userId == null)
      userId = ""
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `${localStorage.getItem('token')}`),
      params: new HttpParams()
        .append("userId", userId)
        .append("connectedUserId", connectedUserId)
    }
    return this.http.delete(environment.serverUrl + 'connections', header)
  }

  getRequestsConnections() {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `${localStorage.getItem('token')}`)
    }
    return this.http.get(environment.serverUrl + 'connections/requests/' + localStorage.getItem("userId"), header)
  }
}
