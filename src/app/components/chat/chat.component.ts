import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import * as io from 'socket.io-client';
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  disableScrollDown = false;
  chats: Array<any> = [];
  joined: boolean;
  newUser = {nickname: '', room: ''};
  messageData = {room: '', nickname: '', message: ''};
  socket = io('http://localhost:3000');
  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    if (user !== null) {
      this.getChatByRoom(user.room);
      this.messageData = {room: user.room, nickname: user.nickname, message: ''};
      this.joined = true;
      this.scrollToBottom();
    }
    this.socket.on('new-message', (data) => {
      let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
      if (user && user.room === data.room) {
        this.chats.push(data);
        this.messageData = {room: user.room, nickname: user.nickname, message: ''};
        // this.scrollToBottom();
      }
    });
  }

  ngAfterViewChecked() {
    // this.scrollToBottom();
  }

  scrollToBottom(): void {
    console.log('this.myScrollContainer', this.myScrollContainer);
   /* if (this.disableScrollDown) {
      return;
    }
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
    catch (err) {
      console.error('err', err);
    }*/
  }

  getChatByRoom(room) {
    this.chatService.getChatByRoom(room)
      .then(res => {
        this.chats = res['data'];
      })
      .catch(err => {
        console.log('get chat by room err', err);
      })
  }

  joinRoom() {
    localStorage.setItem("user", JSON.stringify(this.newUser));
    this.messageData = {room: this.newUser.room, nickname: this.newUser.nickname, message: ''};
    this.joined = true;
    this.socket.emit('save-message', {
      room: this.newUser.room,
      nickname: this.newUser.nickname,
      message: 'Joined this room',
      updated_at: new Date()
    });

  }

  sendMessage() {
    console.log('this.messageData send message', this.messageData);
    this.chatService.saveChat(this.messageData).then((result) => {
      this.socket.emit('save-message', result['data']);
    }, (err) => {
      console.error('err', err);
    });
  }

  logout() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.socket.emit('save-message', {
      room: user.room,
      nickname: user.nickname,
      message: 'Left this room',
      updated_at: new Date()
    });
    localStorage.removeItem('user');
    this.joined = false;
  }
  onScroll() {
    let element = this.myScrollContainer.nativeElement;
    let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    if (this.disableScrollDown && atBottom) {
      this.disableScrollDown = false
    } else {
      this.disableScrollDown = true
    }
  }
}
