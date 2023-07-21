import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
    // const roomName = 'roomName';
    // this.socket.emit('joinRoom', roomName);
    // console.log("New member joined to room");
  }

  public joinNewUser(username: string) {
    this.socket.emit('addUserToGroup', username);
  }

  public sendMessage(message: any) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return new Observable((observer: Observer<any>) => {
      this.socket.on('new-message', (message: any) => {
          observer.next(message);
      });
    });
  }

  public getActiveUsers = () => {

    return new Observable((observer: Observer<any>) => {
      this.socket.on('get-active-users', (users: any) => {
          observer.next(users);
      });
    });
  }
}
