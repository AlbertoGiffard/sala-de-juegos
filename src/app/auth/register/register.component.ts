import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onRegister(){
    const {name, email, password} = this.registerForm.value;

    try {
      const user = await this.authService.register(name, email, password);

      if (user) {
        //redirect to home
        this.router.navigate(['/home']);
      }
      
    } catch (error) {
      console.log("No se pudo registrar correctamente");      
    }
  }

}
