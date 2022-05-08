import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/class/user';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit {
  WORDS: Array<string>;
  wordSelected: string;
  match: Array<string>;
  life: number;
  fails: number;
  found: boolean;
  userExist: any;
  userStats: any;
  topScore: number;
  @Input() word: string;
  @Input() letters: any;
  @Input() image: string;

  constructor(private renderer: Renderer2, private router: Router, private service: AuthService, private auth: Auth) {
    this.WORDS = [
      'ordenador',
      'videojuego',
      'playstation',
      'mesa',
      'caracteristicas',
      'honduras',
      'colina',
      'didacta',
      'consola',
      'original',
      'region',
      'sombra',
      'teclado',
      'raton'
    ];

    this.userExist = this.auth.currentUser;
    this.found = false;
    this.wordSelected = '';
    this.match = [];
    this.life = 6;
    this.fails = 0;
    this.topScore = 0;
    this.word = '';
    this.image = '../../../../assets/ahorcado/palo.jpg';

  }

  ngOnInit(): void {
    this.start();

    this.service.getUsers().subscribe(listDoc => {
      listDoc.forEach(user => {

        if (user.uid == this.auth.currentUser?.uid) {
          this.userStats = user;
          this.topScore = this.userStats.topScoreAhorcado;
          this.found = true;
          return;
        }
      });
    });


  }

  saveGame = () => {
    if (this.found) {
      this.userStats.topScoreAhorcado++;
      this.userStats.lastSignIn = this.auth.currentUser?.metadata.lastSignInTime;

      this.service.updateUser(this.userStats).then(() => {
        this.modalWin();
      }); 
    } else {
      const user = new User();
      user.uid = this.auth.currentUser?.uid;
      user.lastSignIn = this.auth.currentUser?.metadata.lastSignInTime;
      user.topScoreAhorcado = 1;

      this.service.guardarUser(user).then(() => this.modalWin());
    }
  }

  selectWord = (words: any) => {
    var totalWords = words.length - 1;
    var random = (Math.random() * totalWords).toFixed(0);

    this.wordSelected = words[random].toLowerCase();
    console.log(this.wordSelected);
    this.printWord(this.wordSelected);
  }

  check = (event: any) => {
    this.checkLetter(event.target.textContent);
  }

  printWord(word: string) {
    var aux = '';
    var letters = word.split('');
    var div = document.getElementById('word');

    letters.forEach((letter, i) => {
      if (this.match.includes(letter)) {
        aux += `<div class="oculto">${letter}</div>`;
      } else {
        this.match[i] = "_";
        aux += `<div class="oculto">?</div>`;
      }
    });

    if (div != undefined) {
      div.innerHTML = aux;
    }
  }

  abc = () => {
    var a = 97;
    var z = 123;
    var letters = document.getElementById('letters');

    for (let l = a; l < z; l++) {
      const char = String.fromCharCode(l);
      var letter = document.createElement('div');
      letter.classList.add('abc', 'bg-secondary', 'text-primary', 'manito', 'col', 'm-2', 'border', 'border-primary', 'rounded', 'display-4');
      letter.setAttribute('id', 'letra-' + char);
      letter.textContent = char;
      letter.addEventListener('click', this.check);


      letters?.appendChild(letter);
    }
  }

  checkLetter = (char: any) => {
    var letter = document.getElementById('letra-' + char);

    if (this.wordSelected.indexOf(char) != -1) {
      for (var i = 0; i < this.wordSelected.length; i++) {
        if (this.wordSelected[i] == char) {
          this.match[i] = char;
        }
      }

      //this.match.push(char)
      this.printWord(this.wordSelected);

      letter?.classList.remove('bg-secondary', 'text-primary');
      letter?.classList.add('bg-primary');
    } else {
      this.life--;
      this.fails++;
      letter?.classList.toggle('bg-secondary');
      letter?.classList.toggle('text-primary');
      letter?.classList.add('bg-error', 'text-light');
      this.image = `../../../../assets/ahorcado/${this.fails}.jpg`;
    }

    letter?.classList.toggle('manito');
    letter?.removeEventListener('click', this.check);

    //verifica si la palabra fue compeltada o no
    this.checkWord();
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

  modalWin = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Muy bien!',
      text: "Haz ganado, gracias por jugar",
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Si, otra vez!',
      cancelButtonText: 'listo, no mas',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      } else (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      )
    })
  }

  checkWord = () => {
    if (this.life == 0) {
      this.modalLose();
    } else if (this.match.indexOf('_') == -1) {
      this.image = '../../../../assets/ahorcado/win.gif';

      if (this.userExist != null) {
        this.saveGame();
      } else {
        this.modalWin();
      }
    }
  }

  start = () => {
    this.selectWord(this.WORDS);
    this.abc();
  }
}
