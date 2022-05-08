import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/class/user';
import { PreguntadoService } from 'src/app/services/preguntado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntado',
  templateUrl: './preguntado.component.html',
  styleUrls: ['./preguntado.component.scss']
})
export class PreguntadoComponent implements OnInit {
  loading: boolean;
  lifes: number;
  images: any;
  questions: any[];
  imageToShow: string;
  currentQuestion: number;
  questionToShow: any;
  homer: any;
  bart: any;
  lisa: any;
  points : number;
  winOrLose: string[];
  topScore: number;
  userExist: any;
  userStats: any;
  found: boolean;

  constructor(public imgService: PreguntadoService, public router : Router, public service : AuthService, public auth : Auth) {
    this.loading = true;
    this.currentQuestion = this.randomNumber();
    this.lifes = 3;
    this.images = [];
    this.questions = this.completeListQ();
    this.imageToShow = '';
    this.winOrLose = [];
    this.found = false;
    this.topScore = 0;
    this.points = 0;
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe(listDoc => {
      listDoc.forEach(user => {

        if (user.uid == this.auth.currentUser?.uid) {
          this.userStats = user;
          this.topScore = this.userStats.topScorePreguntados;
          this.found = true;
          return;
        }
      });
    });

    this.imgService.getHomer().subscribe(character => {
      this.homer = {
        topic: 'sports',
        img: character[0].image
      };
    });

    this.imgService.getBart().subscribe(character => {
      this.bart = {
        topic: 'entertainment',
        img: character[0].image
      };
    });

    this.imgService.getLisa().subscribe(character => {
      this.lisa = {
        topic: 'art',
        img: character[0].image
      };


      setTimeout(() => {
        this.loading = false;
        this.pickQuestion();
      }, 1000);
    });
  }


  completeListQ = () => {
    return [
      {
        topic: 'sports',
        question: '¿Qué equipo ha ganado mayor cantidad de Champions League?',
        options: [
          {
            correct: true,
            option: 'Real Madrid'
          },
          {
            correct: false,
            option: 'Barcelona'
          },
          {
            correct: false,
            option: 'Bayern Munich'
          }
        ]
      },
      {
        topic: 'entertainment',
        question: '¿Qué personaje interpreta Mark Hamill en la saga de Star Wars?',
        options: [
          {
            correct: true,
            option: 'Luke Skywalker'
          },
          {
            correct: false,
            option: 'Yoda'
          },
          {
            correct: false,
            option: 'Darth Vader'
          }
        ]
      },
      {
        topic: 'art',
        question: '¿Como se llama el disco de Bruno Mars y Anderson Paak?',
        options: [
          {
            correct: false,
            option: 'Show Time'
          },
          {
            correct: true,
            option: 'An evening with Silk Sonic'
          },
          {
            correct: false,
            option: 'Are you ready?'
          }
        ]
      }
    ]
  }

  randomNumber = () => {
    var question: number;

    do {
      question = Math.floor(Math.random() * 3);
      console.log(question);

    } while (question == this.currentQuestion);

    return question;
  }

  pickQuestion = () => {
    this.currentQuestion = this.randomNumber();
    switch (this.questions[this.currentQuestion].topic) {
      case 'sport':
        this.imageToShow = this.homer.img;
        break;

      case 'entertainment':
        this.imageToShow = this.bart.img;
        break;

      case 'art':
        this.imageToShow = this.lisa.img;
        break;

      default:
        this.imageToShow = this.homer.img;
        break;
    }

    this.questionToShow = this.questions[this.currentQuestion];
    this.winOrLose = [];
  }

  correctAnswer = (option: any, i: number) => {
    this.winOrLose = [];
    if (option.correct) {
      this.points++;
      this.winOrLose[i] = 'rgb(16, 222, 16)';
      setTimeout(() => {
        this.pickQuestion();
      }, 1000);
    } else {
      this.winOrLose[i] = 'rgb(222, 16, 16)';
      this.lifes--;

      if (this.lifes > 0) {
        setTimeout(() => {
          this.pickQuestion();
        }, 1000);
      } else {
        this.lose();
      }
    }
  }

  modalLose = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Game Over',
      text: "Parece que perdiste, quieres volver a jugar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, otra vez!',
      cancelButtonText: 'No, me rindo',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      } else {
        result.dismiss === Swal.DismissReason.cancel;
        this.router.navigate(['/sala']);
      }
    })
  }

  lose = () => {
    if (this.lifes == 0) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      if (this.found) {
        this.userStats.topScorePreguntados += this.points;
        this.userStats.lastSignIn = this.auth.currentUser?.metadata.lastSignInTime;
  
        this.service.updateUser(this.userStats).then(() => {
          this.modalLose();
        }); 
      } else {
        const user = new User();
        user.uid = this.auth.currentUser?.uid;
        user.lastSignIn = this.auth.currentUser?.metadata.lastSignInTime;
        user.topScorePreguntados = this.topScore;
  
        this.service.guardarUser(user).then(() => this.modalLose());
      }
    }
  }



}
