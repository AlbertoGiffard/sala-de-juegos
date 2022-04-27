import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
    this.lifes = 7;
    this.points = 0;
    this.image = '../../../../assets/mayorMenor/back.png';
    this.currentCard = this.randomNumber();
    this.started = false;
  }

  ngOnInit(): void {

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
