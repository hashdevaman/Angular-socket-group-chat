import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private chatService: ChatService) {}

  public message: string = '';
  public allChats: any[] = [];
  public userName: string | null = '';
  public activeUsersList: any = [];

  ngOnInit() {

    this.userName = sessionStorage.getItem('chat-user-name');
    if(sessionStorage.getItem('active-chat-users')) {
      this.activeUsersList =  JSON.parse(sessionStorage.getItem('active-chat-users') || '');
    }


    this.getLatestMessage();
    this.getActiveUsers();
  }

  sendMessage() {

    const messageObj = {
      "message": this.message,
      "user": this.userName
    };

    this.chatService.sendMessage(messageObj);
    this.message = '';
  }

  getLatestMessage() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {

        console.log("Latest message", message);
        this.allChats.push(message);
      });
  }

  getActiveUsers() {
    this.chatService
      .getActiveUsers()
      .subscribe((users: string) => {

        sessionStorage.setItem('active-chat-users', JSON.stringify(users))
        this.activeUsersList = users;
      });
  }
}
