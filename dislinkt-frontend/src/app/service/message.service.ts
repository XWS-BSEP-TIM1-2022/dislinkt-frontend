import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Chat } from '../model/chat.model';
import { Message } from '../model/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }
  getAllUserNotifications(userId: string){
    return this.http.get(environment.serverUrl + 'notifications/'+ userId);
  }

  getAllUserChats(userId: string){
    return this.http.get(environment.serverUrl + 'chats/'+ userId);
  }

  createChat(newChat: Chat){
    return this.http.post(environment.serverUrl + 'chats', newChat);
  }

  getAllMessagesForChat(chatId: string){
    return this.http.get(environment.serverUrl + 'messages/'+ chatId);
  }

  createMessage(newMessage: Message){
    return this.http.post(environment.serverUrl + 'messages', newMessage);
  }
}
