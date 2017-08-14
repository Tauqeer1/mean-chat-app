import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ChatService {

  constructor(private http: Http) {
  }

  getChatByRoom(room) {
    console.log('room', room);
    return new Promise((resolve, reject) => {
      this.http.get('api/chats/' + room)
        .map(res => {
          return res.json();
        })
        .subscribe(res => {
          return resolve(res);
        }, err => {
          console.error('err', err);
          return reject(err);
        });
    });
  }

  saveChat(data) {
    return new Promise((resolve, reject) => {
      this.http.post('api/chats', data)
        .map(res => {
          return res.json();
        })
        .subscribe(res => {
          return resolve(res);
        }, (err) => {
          return reject(err);
        });
    });
  }
}
