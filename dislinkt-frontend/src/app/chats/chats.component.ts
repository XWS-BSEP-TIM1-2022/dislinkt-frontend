import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  chats: any;

  constructor(public authService: AuthService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.loadChats();
  }

  loadChats = () => {
    this.messageService.getAllUserChats(this.authService.getUserId()).subscribe(
      (data: any) => {
        this.chats = data.chat
      },
      (error) => {
        this.chats = []
        if(error.error.message="unauthorized"){
          this.authService.logout()
          this.router.navigate([''])
        }
      }
    )  
  }

  isUsername(username: string): boolean {
    return this.authService.getUsername() === username;
  }

  openChat(chatId: string){
    this.router.navigate(['chats/' + chatId])
  }

}
