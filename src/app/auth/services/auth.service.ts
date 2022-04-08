import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AuthService {
  
  constructor(public afAuth: AngularFireAuth) {
    
   }

  async login(email:string, password:string){
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;

    } catch (error) {
      console.log("No se ha podido hacer el login correctamente");      
      console.log(error);
    }

    return;
  }

  async register(name:string, email:string, password:string){
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.log("No se ha podido hacer el registro correctamente");      
      console.log(error);
    }

    return;
  }

  async logout(){
    try {
      await this.afAuth.signOut();      
    } catch (error) {
      console.log(error);      
    }
  }

  getCurrentUser(){
    return this.afAuth.authState;
  }
}
