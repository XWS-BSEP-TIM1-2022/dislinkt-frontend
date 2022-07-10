import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Message } from '../model/message.model';
import { AuthService } from '../service/auth.service';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: any;
  chatId: string = "";
  textForm = new FormControl('');

  constructor(public authService: AuthService, private messageService: MessageService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.chatId = params['chatId']
      this.loadMessage();
    })
  }

  ngOnInit(): void {

  }

  loadMessage = () => {
    this.messageService.getAllMessagesForChat(this.chatId).subscribe(
      (data: any) => {
        this.messages = data.messages;
      },
      (error: any) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 1000,
            showConfirmButton: false,
          })

      })
  }

  sendMessage = () => {
    let message = new Message();
    message.chatId = this.chatId;
    message.message = this.textForm.value;
    message.username = this.authService.getUsername();
    this.messageService.createMessage(message).subscribe(
      (data) => {
        this.loadMessage();
        this.textForm.patchValue("");
      }, 
      (error) =>
      {
        Swal.fire(
          {
            icon: 'error',
            title: 'Poruka nije poslata!',
            timer: 1000,
            showConfirmButton: false,
          })

      })
  }

  getDate = (date: string) =>{
    return new Date(date).toLocaleString();
  }



}
