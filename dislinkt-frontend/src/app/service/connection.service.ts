import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  constructor(private http: HttpClient) { }

  getAllByUserId(userId: any) {
    return this.http.get(environment.serverUrl + 'connections/all/' + userId)
  }

  newConnection(connectedUserId: any) {
    return this.http.post(environment.serverUrl + 'connections', { userId: localStorage.getItem("userId"), connectedUserId: connectedUserId })
  }

  rejectConnection(userId: any, connectedUserId: any) {
    return this.http.put(environment.serverUrl + 'connections/reject', { userId: userId, connectedUserId: connectedUserId })
  }

  approveConnection(userId: any, connectedUserId: any) {
    return this.http.put(environment.serverUrl + 'connections/approve', { userId: userId, connectedUserId: connectedUserId })
  }

  deleteConnection(connectedUserId: any) {
    var userId = localStorage.getItem("userId")
    if (userId == null)
      userId = ""
    var option = {
      params: new HttpParams()
        .append("userId", userId)
        .append("connectedUserId", connectedUserId)
    }
    return this.http.delete(environment.serverUrl + 'connections', option)
  }

  getRequestsConnections() {
    return this.http.get(environment.serverUrl + 'connections/requests/' + localStorage.getItem("userId"))
  }

  block(userId: string, blockUserId: string) {
    return this.http.post(environment.serverUrl + 'block', { userId: userId, blockUserId: blockUserId })
  }

  unblock(userId: string, blockUserId: string) {
    return this.http.put(environment.serverUrl + 'block', { userId: userId, blockUserId: blockUserId })
  }

  getBlockedUsersId(userId: string) {
    return this.http.get(environment.serverUrl + 'block/' + userId)
  }
  
  getConnection(userId: any, connectedUserId: any) {
    return this.http.get(environment.serverUrl + 'connections/' + userId + '/' + connectedUserId)
  }
  
  getSuggestions(userId: any) {
    return this.http.get(environment.serverUrl + 'connections/suggestions/' + userId)
  }

  isBlockedAny(userId: any, blockedUserId: any) {
    return this.http.get(environment.serverUrl + 'block/any/' + userId + '/' + blockedUserId)
  }

  changeMessageNotification(userId: string, connectedUserId: string) {
    return this.http.put(environment.serverUrl + 'connections/notification/message', { userId: userId, connectedUserId: connectedUserId })
  }

  changePostNotification(userId: string, connectedUserId: string) {
    return this.http.put(environment.serverUrl + 'connections/notification/post', { userId: userId, connectedUserId: connectedUserId })
  }

  changeCommentNotification(userId: string, connectedUserId: string) {
    return this.http.put(environment.serverUrl + 'connections/notification/comment', { userId: userId, connectedUserId: connectedUserId })
  }
}
