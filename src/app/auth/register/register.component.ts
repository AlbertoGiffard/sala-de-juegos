import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  public created: boolean = false;
  public errorMessage: string;

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authService: AuthService, private router: Router) {
    this.errorMessage = "No se pudo crear el usuario de forma correcta verifique los datos.";
  }

  ngOnInit(): void {
  }

  async onRegister() {
    const { name, email, password } = this.registerForm.value;

    try {
      const user = await this.authService.register(name, email, password);

      if (user) {
        //redirect to home
        this.created = false;
        this.router.navigate(['/home']);
      }

    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
        this.errorMessage = this.convertMessage(error.code);
        this.created = true;
      }
    }
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
