import { Component, Input, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { Message } from 'src/app/class/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() userLogged: any;
  messages: any[];
  showChat: boolean;
  newMessage:string;

  constructor(private authService: AuthService, private auth: Auth, private activatedRouter: ActivatedRoute, private dataStorage : StorageService) {
    //debe ser false
    this.showChat = false;
    this.newMessage = '';
    this.messages = [];    
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.userLogged = user;
    })

    this.dataStorage.getMensajes().subscribe(data => {
      
      this.messages = [];
      data.forEach(msg => this.messages.unshift(msg));
      
    })

  }

  sendMessage() {
    if (this.newMessage != '') {
      var time = new Date();
      var currentTime = time.getTime();
      var currentHour = time.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute:'2-digit'
      });
      var message = new Message();
      
      message = {
        uid: this.userLogged.uid,
        message: this.newMessage,
        user: this.userLogged.displayName ? this.userLogged.displayName : this.userLogged.email,
        date: currentTime,
        hour: currentHour
      };

      this.dataStorage.saveMessage(message);
      
      setTimeout(() => {
        this.scrollToTheLastElementByClassName();
      }, 20);
      
      this.newMessage = '';
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
