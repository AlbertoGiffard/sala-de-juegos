import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Auth } from '@angular/fire/auth';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss']
})
export class MayorMenorComponent implements OnInit {
  @Input() lifes: number;
  @Input() points: number;
  @Input() image: string;
  @Input() currentCard: number;
  @Input() started: boolean;
  topScore: number;
  userExist: any;
  userStats: any;
  found: boolean;

  constructor(private router: Router, private service: AuthService, private auth: Auth) {
    this.lifes = 7;
    this.points = 0;
    this.found = false;
    this.topScore = 0;
    this.image = '../../../../assets/mayorMenor/back.png';
    this.currentCard = this.randomNumber();
    this.started = false;

    this.userExist = this.auth.currentUser;
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe(listDoc => {
      listDoc.forEach(user => {

        if (user.uid == this.auth.currentUser?.uid) {
          this.userStats = user;
          this.topScore = this.userStats.topScoreMyM;
          this.found = true;
          return;
        }
      });
    });
  }

  randomNumber = () => {
    var card: number;

    do {
      card = Math.floor((Math.random() * 9) + 2);
    } while (card == this.currentCard);

    return card;
  }

  changeImage = (card: number) => {
    this.image = `../../../../assets/mayorMenor/${card}.png`;
  }

  checkPlayer = (endGame: boolean) => {

  }

  /* si la carta siguiente es mayor retornara true */
  topCard = () => {
    var result: boolean = false;
    var newCard: number = this.randomNumber();

    this.changeImage(newCard);

    if (newCard > this.currentCard) {
      result = true;
    }
    this.currentCard = newCard;

    return result;
  }

  continuePlaying = () => {
    this.points++;
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
    this.lifes--;

    if (this.lifes == 0) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      if (this.found) {
        this.userStats.topScoreMyM += this.points;
        this.userStats.lastSignIn = this.auth.currentUser?.metadata.lastSignInTime;
  
        this.service.updateUser(this.userStats).then(() => {
          this.modalLose();
        }); 
      } else {
        const user = new User();
        user.uid = this.auth.currentUser?.uid;
        user.lastSignIn = this.auth.currentUser?.metadata.lastSignInTime;
        user.topScoreMyM = this.points;
  
        this.service.guardarUser(user).then(() => this.modalLose());
      }
    }
  }

  pressPlus = () => {
    this.started = true;

    if (this.topCard()) {
      this.continuePlaying();
    } else {
      this.lose();
    }
  }

  pressLess = () => {
    this.started = true;
    
    if (!this.topCard()) {
      this.continuePlaying();
    } else {
      this.lose();
    }
  }

}
