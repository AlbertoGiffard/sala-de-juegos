import { transformAll } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], 
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) { 
    
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
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.log("Hubo un error al intentar loguear");
      
    }
  }

}
