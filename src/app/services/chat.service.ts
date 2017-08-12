import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ChatService {

  constructor(private http: Http) {
  }

  getChatByRoom(room) {
    return new Promise((resolve, reject) => {
      this.http.get('/chat/' + room)
        .map(res => {
          return res.json();
        })
        .subscribe(res => {
          return resolve(res);
        }, err => {
          return reject(err);
        });
    });
  }

  saveChat(data) {
    return new Promise((resolve, reject) => {
      this.http.post('/chat', data)
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
