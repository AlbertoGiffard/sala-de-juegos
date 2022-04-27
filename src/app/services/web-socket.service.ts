import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject, Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  /* socket:any;
  server:string = 'http://localhost:3000';  */
  message$:BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
  }
  /* this.socket = io.io(this.server); */
  
  /* listen = (eventName:string) => {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data:any) =>{
        subscriber.next(data);
      })
    })
  }
  
  emit = (eventName:string, data:any) => {
    this.socket.emit(eventName, data);
  } */
  socket = io.io('http://localhost:3000');

  sendMessage = (message:any) => {
    this.socket.emit('message', message);
  }

  getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };
}
