import { Component, Input, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth/services/auth.service';
import * as io from 'socket.io-client';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() userLogged: any;
  messages: any;
  showChat: boolean;
  socket:any;
  eventName:string;
  userChat:any;

  newMessage:string;
  messageList:string[] = [];

  constructor(private authService: AuthService, private auth: Auth, private activatedRouter: ActivatedRoute, private webService: WebSocketService) {
    //debe ser false
    this.showChat = false;
    this.newMessage = '';
    this.messages = [
      {
        transmitter: "ses6dyDkyXPz48AFOezuUqgMPyJ3",
        text: "Hola que tal?",
        user: "Bruce",
        time: "09:40"
      },
      {
        transmitter: "id",
        text: "todo bien y tu?",
        user: "Diana",
        time: "09:40"
      },
      {
        transmitter: "ses6dyDkyXPz48AFOezuUqgMPyJ3",
        text: "Excelente",
        user: "Bruce",
        time: "09:40"
      },
      {
        transmitter: "id",
        text: "Me alegroo!",
        user: "Diana",
        time: "09:40"
      }
    ];

    /* conexion con socket */
    this.eventName = 'send-message';
    
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.userLogged = user;
    })

    /* this.webService.listen('message-event').subscribe((data) =>{
      this.messages.push(data);
    }) */

    this.webService.getNewMessage().subscribe((message:string) => {
      this.messageList.push(message);
    })

  }

  sendMessage() {
    if (this.newMessage != '') {
      var time = new Date();
      var currentTime = time.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute:'2-digit'
      });
      var message = {
        transmitter: this.userLogged.uid,
        text: this.newMessage,
        user: this.userLogged.displayName ? this.userLogged.displayName : this.userLogged.email,
        time: currentTime
      };

      this.messages.push(message);

      this.userChat = message;

      /* socket */
      /* this.webService.emit(this.eventName, message); */
      this.webService.sendMessage(this.newMessage);
      
      this.newMessage = '';
      setTimeout(() => {
        this.scrollToTheLastElementByClassName();
      }, 20);

    }
  }

  scrollToTheLastElementByClassName() {
    var elements = document.getElementsByClassName('msg');
    var lastElement: any = elements[(elements.length - 1)];
    var toppos = lastElement.offsetTop;

    //@ts-ignore
    document.getElementById('containerMessages')?.scrollTop = toppos;
  }

}
