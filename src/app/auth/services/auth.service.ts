import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/class/user';

@Injectable()
export class AuthService {
  /* esto es para el firestore */
  items: Observable<any[]>;

  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.items = firestore.collection('items').valueChanges();

  }

  async login(email: string, password: string) {
    const user = { email: email, password: password };
    const result = await this.afAuth.signInWithEmailAndPassword(email, password);
    return result;
  }

  async register(name: string, email: string, password: string) {

    const user = { name: name, email: email, password: password };
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.firestore.collection('users').add(user);

    return result;
  }

  //Actualiza un usuario
  updateUser(user: User) {
    return this.firestore.collection('users').doc(user.id).update(user);
  }

  async guardarUser(user: User) {
    try {
      const data = {
        uid: user.uid,
        lastSignIn: user.lastSignIn,
        topScoreAhorcado: user.topScoreAhorcado,
        topScoreMyM: user.topScoreMyM,
        topScorePreguntados: user.topScorePreguntados,
        topScorePropio: user.topScorePropio
      }
      await this.firestore.collection('users').add(data);
    } catch (error) {
      console.log(error);
    }
  }

  async guardarEncuesta(data: any) {
    try {
      const upload = {
        uid: data.uid,
        lastSignIn: data.lastSignIn,
        topScoreAhorcado: data.topScoreAhorcado,
        topScoreMyM: data.topScoreMyM,
        topScorePreguntados: data.topScorePreguntados,
        topScorePropio: data.topScorePropio,
        age: data.age,
        favoriteGame: data.favoriteGame,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        whatIDo: data.whatIDo
      }
      await this.firestore.collection('users').add(upload);
    } catch (error) {
      console.log(error);
    }
  }

  updateQuiz(data: any) {
    return this.firestore.collection('users').doc(data.id).update(data);
  }

  //Obtiene todos los usuarios
  getUsers = (): Observable<any[]> => {
    return this.firestore.collection('users').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => {
          const data = d.payload.doc.data() as any[];
          const id = d.payload.doc.id;
          return { id, ...data };
        })
      }));
  }

  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }
}
