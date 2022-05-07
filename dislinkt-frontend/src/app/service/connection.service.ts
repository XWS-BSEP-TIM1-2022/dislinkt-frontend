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

  rejectConnection(userId:any, connectedUserId: any) {
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
}
