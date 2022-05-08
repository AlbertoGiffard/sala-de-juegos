import { transformAll } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], 
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {
  created: boolean;
  errorMessage: string;
  loginForm: FormGroup;
  
  constructor(private authService: AuthService, private router: Router, private auth: Auth) { 
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });

    this.errorMessage = "No se pudo loguear al usuario de forma correcta verifique los datos.";
    this.created = false;
  }

  ngOnInit(): void {
    
  }
  
 /*  transform(){
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
  } */

  async onLogin(){
    const {email, password} = this.loginForm.value;
    try {
      const user = await this.authService.login(email, password);          

      if (user) {
        //redirect to home
        this.router.navigate(['/sala']);        
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
        this.errorMessage = this.convertMessage(error.code);
        this.created = true;
      }      
    }
  }

  usuarioPreCargado(){
    this.loginForm.setValue({
      email: 'batman@gmail.com',
      password: '123456'
    }) 
  }

  convertMessage(code: string): string {
    switch (code) {
      case 'auth/user-disabled': {
        return 'Usuario deshabilitado.';
      }
      case 'auth/user-not-found': {
        return 'Usuario no encontrado.';
      }
      case 'auth/wrong-password': {
        return 'Password incorrecto intente nuevamente.';
      }
      case 'auth/email-already-in-use': {
        return 'Usuario ya creado.';
      }
      case 'auth/weak-password': {
        return 'Error, password debil, minimo 6 digitos.';
      }
      case 'auth/invalid-email': {
        return 'Error, mail Invalido.';
      }
      default: {
        return 'No se pudo crear el usuario de forma correcta verifique los datos.';
      }
    }
  }

}
