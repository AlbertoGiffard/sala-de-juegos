import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/class/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  form: FormGroup;
  fb: FormBuilder;
  userExist: any;
  userStats: any;
  found: boolean;
  topScoreAhorcado: number;
  topScoreMyM: number;
  topScorePreguntados: number;
  topScorePropio: number;

  constructor(private service: AuthService, private auth: Auth) {
    this.found = false;
    this.userExist = this.auth.currentUser;
    this.topScoreAhorcado = 0;
    this.topScoreMyM = 0;
    this.topScorePreguntados = 0;
    this.topScorePropio = 0;
    this.fb = new FormBuilder();
    this.form = this.fb.group(
      {
        'firstName': ['', [Validators.required]],
        'lastName': ['', [Validators.required]],
        'age': [, [Validators.required, Validators.min(18), Validators.max(99)]],
        'phone': [, [Validators.required, Validators.max(9999999999), Validators.pattern("^[0-9]*$")]],
        'favoriteGame': ['', [Validators.required]],
        'whatIDo': ['', [Validators.required]],
        'text': ['', [Validators.required]],
        'checkAbout': [],
        'checkChat': [],
        'checkGames': [],

      }
    );
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe(listDoc => {
      listDoc.forEach(user => {

        if (user.uid == this.auth.currentUser?.uid) {
          this.userStats = user;
          this.topScoreAhorcado = this.userStats.topScoreAhorcado;
          this.topScoreMyM = this.userStats.topScoreMyM;
          this.topScorePreguntados = this.userStats.topScorePreguntados;
          this.topScorePropio = this.userStats.topScorePropio;
          this.found = true;
          return;
        }
      });
    });
  }

  modalSuccess = () => {
    this.form.reset();
    Swal.fire(
      'Lista subida correctamente',
      'success'
    );
  }

  modalError = () => {
    Swal.fire(
      'Falta completar campos',
      'error'
    )
  }

  submitForm = () => {
    if (this.checkForm()) {
      var answers = this.form.getRawValue();
      var whatIDo = this.updateCheckbox();
      var quiz = {
        id: this.userStats.id,
        uid: this.auth.currentUser?.uid,
        lastSignIn: this.auth.currentUser?.metadata.lastSignInTime,
        topScoreAhorcado: this.userStats.topScoreAhorcado,
        topScoreMyM: this.userStats.topScoreMyM,
        topScorePreguntados: this.userStats.topScorePreguntados,
        topScorePropio: this.userStats.topScorePropio,
        age: answers.age,
        favoriteGame: answers.favoriteGame,
        firstName: answers.firstName,
        lastName: answers.lastName,
        phone: answers.phone,
        whatIDo: whatIDo
      }
  
      if (this.found) {
  
        this.service.updateQuiz(quiz).then(() => {
          this.modalSuccess();
        });
      } else {
        this.service.guardarEncuesta(quiz).then(() => this.modalSuccess());
      }
      
    } else{
      this.modalError();
    }


  }

  updateCheckbox = () => {
    let checkAbout = this.form.controls['checkAbout'].value;
    let checkChat = this.form.controls['checkChat'].value;
    let checkGames = this.form.controls['checkGames'].value;
    var whatIDo = [];

    if (checkAbout) {
      whatIDo.push('Lei la pestaña about');
    }

    if (checkChat) {
      whatIDo.push('Escribi por el chat');
    }

    if (checkGames) {
      whatIDo.push('He ido a la sala de juegos');
    }

    return whatIDo;
  }

  checkForm = () => {
    var result = false;
    var answers = this.form.getRawValue();
    var checks = this.updateCheckbox();

    if (answers.age != '' && answers.favoriteGame != '' && answers.firstName != '' && answers.lastName != '' && answers.phone != '') {
      if (checks != []) {
        result = true;
      }
    }

    return result;
  }

}
