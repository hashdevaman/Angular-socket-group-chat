import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private chatService: ChatService, private router: Router) {}
  public chatUserName: string = '';

  addChatUser() {

    sessionStorage.setItem("chat-user-name", this.chatUserName)
    this.chatService.joinNewUser(this.chatUserName);
    this.chatUserName = '';
    this.router.navigate(['/chatboard']);
  }

}
