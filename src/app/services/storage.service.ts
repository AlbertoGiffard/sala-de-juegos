import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage } from '@angular/fire/storage';
import { Observable, take } from 'rxjs';
import { Message } from '../class/message';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFirestore) { }

  getMensajes = () : Observable<any[]> => {
    return this.storage.collection('mensajes', ref => ref.orderBy('date', 'desc').limit(7)).valueChanges();
  }

  async saveMessage(message: Message) {
    try {
      await this.storage.collection('mensajes').add(message);
    } catch (error) {
      console.log(error);
    }
  }
}
